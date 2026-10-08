import { NextResponse } from "next/server";



type SlipData = {

    bankName: string;

    transactionType: "income" | "expense" | "unknown";

    payerName: string;

    payerAccount: string;

    payeeName: string;

    payeeAccount: string;

    transferDate: string;

    transferTime: string;

    amount: number | null;

};



const MAX_FILE_SIZE = 4 * 1024 * 1024;



const IMAGE_TYPES = new Set([

    "image/jpeg",

    "image/png",

    "image/webp",

    "image/gif",

]);



const BANK_PATTERNS: Array<[string, RegExp]> = [

    ["SCB", /\bSCB\b|ไทยพาณิชย์|ธนาคารไทยพาณิชย์/i],

    ["KBank", /\bKBank\b|กสิกรไทย|ธนาคารกสิกรไทย/i],

    ["KBANK", /\bKBANK\b/i],

    ["BBL", /\bBBL\b|ธนาคารกรุงเทพ/i],

    ["KTB", /\bKTB\b|กรุงไทย|ธนาคารกรุงไทย/i],

    ["BAY", /\bBAY\b|กรุงศรี|ธนาคารกรุงศรีอยุธยา/i],

    ["TTB", /\bTTB\b|ทีทีบี|ทหารไทยธนชาต|ธนาคารทหารไทยธนชาต/i],

    ["GSB", /\bGSB\b|ออมสิน|ธนาคารออมสิน/i],

    ["BAAC", /\bBAAC\b|ธ\.ก\.ส\.|ธกส|ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร/i],

    ["Krungsri", /Krungsri|กรุงศรี/i],
    ["KKP", /\bKKP\b|KKP\s*Better|เกียรตินาคินภัทร|เกียรตินาคิน|Kiatnakin/i],

];



function normalizeThaiDigits(value: string) {

    const thaiDigits = "๐๑๒๓๔๕๖๗๘๙";



    return value.replace(/[๐-๙]/g, (digit) =>

        String(thaiDigits.indexOf(digit)),

    );

}



function clean(value: string) {

    return normalizeThaiDigits(value)

        .replace(/\u00a0/g, " ")

        .replace(/[ \t]+/g, " ")

        .trim();

}



function normalizeCompare(value: string) {

    return clean(value)

        .toLowerCase()

        .replace(

            /^(นาย|นางสาว|นาง|น\.ส\.|นส\.|mr\.?|mrs\.?|ms\.?)\s*/i,

            "",

        )

        .replace(/[\s.-]+/g, "");

}



function normalizeYear(year: number) {

    return year > 2400 ? year - 543 : year;

}



function detectBank(text: string) {

    const normalized = clean(text);



    for (const [bank, pattern] of BANK_PATTERNS) {

        if (pattern.test(normalized)) {

            return bank;

        }

    }



    // OCR มักอ่านโลโก้ SCB เป็น "S C B", "S.C.B" หรือมีช่องว่างคั่น

    const compactLatin = normalized

        .replace(/[^A-Za-z]/g, "")

        .toUpperCase();



    if (compactLatin.includes("SCB")) return "SCB";

    if (compactLatin.includes("KBANK")) return "KBank";

    if (compactLatin.includes("BBL")) return "BBL";

    if (compactLatin.includes("KTB")) return "KTB";

    if (compactLatin.includes("TTB")) return "TTB";

    if (compactLatin.includes("GSB")) return "GSB";

    if (compactLatin.includes("BAAC")) return "BAAC";

    if (compactLatin.includes("BAY")) return "BAY";
    if (compactLatin.includes("KKP")) return "KKP";



    return "";

}



function detectScbSlipMarker(text: string) {

    const normalized = clean(text);



    // บางสลิป SCB อ่านโลโก้ "SCB" ไม่ออก แต่ข้อความส่วนอื่นมีรูปแบบเฉพาะ

    // ของสลิปจ่ายบิล/ชำระเงิน เช่น Biller ID + รหัสร้านค้า + รหัสธุรกรรม

    const scbPhrase =

        /ผู้รับเงินสามารถ\s*สแกน.*ตรวจสอบสถานะการจ่ายเงิน/i.test(normalized);



    const scbMerchantLayout =

        /biller\s*id/i.test(normalized) &&

        /รหัสร้านค้า/i.test(normalized) &&

        /รหัสธุรกรรม/i.test(normalized);



    return scbPhrase || scbMerchantLayout;

}



function extractDate(text: string) {

    const normalized = normalizeThaiDigits(text)

        .replace(/[–—−]/g, "-")

        .replace(/\u00a0/g, " ")

        .replace(/[ \t]+/g, " ");



    const numeric = normalized.match(

        /\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})\b/,

    );



    if (numeric) {

        const [, day, month, yearText] = numeric;

        const year = normalizeYear(Number(yearText));



        return `${year.toString().padStart(4, "0")}-${month.padStart(

            2,

            "0",

        )}-${day.padStart(2, "0")}`;

    }



    const thaiMonths: Record<string, string> = {

        "มค": "01",

        "มกราคม": "01",

        "กพ": "02",

        "กุมภาพันธ์": "02",

        "มีค": "03",

        "มีนาคม": "03",

        "เมย": "04",

        "เมษายน": "04",

        "พค": "05",

        "พฤษภาคม": "05",

        "มิย": "06",

        "มิถุนายน": "06",

        "กค": "07",

        "กรกฎาคม": "07",

        "สค": "08",

        "สิงหาคม": "08",

        "กย": "09",

        "กันยายน": "09",

        "ตค": "10",

        "ตุลาคม": "10",

        "พย": "11",

        "พฤศจิกายน": "11",

        "ธค": "12",

        "ธันวาคม": "12",

    };



    // รองรับรูปแบบสลิปไทย เช่น

    // "08 ก.ค. 2569 - 12:18"

    // "08 ก.ค 2569"

    // "8 กค. 2569"

    // รวมถึงชื่อเดือนเต็ม

    const thai = normalized.match(

        /(?:^|\s)(\d{1,2})\s*((?:ม\s*\.?\s*ค|ก\s*\.?\s*พ|มี\s*\.?\s*ค|เม\s*\.?\s*ย|พ\s*\.?\s*ค|มิ\s*\.?\s*ย|ก\s*\.?\s*ค|ส\s*\.?\s*ค|ก\s*\.?\s*ย|ต\s*\.?\s*ค|พ\s*\.?\s*ย|ธ\s*\.?\s*ค|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม))\s*\.?\s*(\d{2}|\d{4})(?=\s|[-–—:]|$)/i,

    );



    if (thai) {

        const [, day, monthText, yearText] = thai;

        const key = monthText

            .replace(/\s+/g, "")

            .replace(/\./g, "")

            .toLowerCase();



        if (thaiMonths[key]) {

            const rawYear = Number(yearText);

            const buddhistYear = rawYear < 100 ? 2500 + rawYear : rawYear;

            const year = normalizeYear(buddhistYear);



            return `${year.toString().padStart(4, "0")}-${thaiMonths[key]}-${day.padStart(

                2,

                "0",

            )}`;

        }

    }



    return "";

}



function extractDateFromCompactReference(text: string) {

    const normalized = normalizeThaiDigits(text);



    const matches = normalized.match(/20\d{6}/g) ?? [];



    for (const value of matches) {

        const year = Number(value.slice(0, 4));

        const month = Number(value.slice(4, 6));

        const day = Number(value.slice(6, 8));



        if (

            year >= 2000 &&

            year <= 2099 &&

            month >= 1 &&

            month <= 12 &&

            day >= 1 &&

            day <= 31

        ) {

            return `${String(year).padStart(4, "0")}-${String(month).padStart(

                2,

                "0",

            )}-${String(day).padStart(2, "0")}`;

        }

    }



    return "";

}



function extractTime(text: string) {

    const normalized = normalizeThaiDigits(text);



    const match = normalized.match(

        /\b([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?\b/,

    );



    if (!match) return "";



    return `${match[1].padStart(2, "0")}:${match[2]}:${match[3] ?? "00"

        }`;

}



function extractMoney(text: string) {

    const normalized = normalizeThaiDigits(text);

    const lines = normalized

        .split(/\r?\n/)

        .map(clean)

        .filter(Boolean);



    const moneyPattern =

        /(?<!\d)(\d{1,3}(?:,\d{3})*(?:\.\d{2})|\d+(?:\.\d{2}))(?!\d)/g;



    const amountLabels = [

        "ยอดโอน",

        "ยอดเงิน",

        "จำนวนเงิน",

        "ยอดสุทธิ",

        "amount",

        "total",

        "โอนเงิน",

        "เงินจำนวน",

    ];



    for (const line of lines) {

        const lower = line.toLowerCase();



        if (amountLabels.some((label) => lower.includes(label.toLowerCase()))) {

            const matches = [...line.matchAll(moneyPattern)];



            if (matches.length > 0) {

                const raw = matches[matches.length - 1][1].replace(/,/g, "");

                const amount = Number(raw);



                if (Number.isFinite(amount) && amount > 0) {

                    return amount;

                }

            }

        }

    }



    const allMatches = [...normalized.matchAll(moneyPattern)];



    for (let index = allMatches.length - 1; index >= 0; index -= 1) {

        const raw = allMatches[index][1].replace(/,/g, "");

        const amount = Number(raw);



        if (Number.isFinite(amount) && amount > 0) {

            return amount;

        }

    }



    return null;

}



function normalizeLabelLine(line: string) {

    return clean(line)

        .replace(/^ผู้โอนเงิน\s*[:：-]?\s*/i, "ผู้โอน ")

        .replace(/^ผู้ส่งเงิน\s*[:：-]?\s*/i, "ผู้โอน ")

        .replace(/^ผู้รับเงิน\s*[:：-]?\s*/i, "ผู้รับ ")

        .replace(/^ผู้รับโอน\s*[:：-]?\s*/i, "ผู้รับ ")

        .replace(/^จากบัญชี\s*[:：-]?\s*/i, "จาก ")

        .replace(/^ไปยังบัญชี\s*[:：-]?\s*/i, "ไปยัง ");

}



function extractAccount(value: string) {

    const normalized = normalizeThaiDigits(value);



    const matches = normalized.match(

        /(?:\d[\dXx* .-]{4,}\d|[Xx]{1,3}[- ]?[Xx*]{0,3}[- ]?\d{2,4}[- ]\d{1,4}|[Xx*]{1,3}[- ]\d{2,4})/g,

    );



    if (!matches?.length) return "";



    return matches

        .map((item) => clean(item))

        .sort(

            (a, b) =>

                b.replace(/\s/g, "").length -

                a.replace(/\s/g, "").length,

        )[0];

}



function looksLikeAccount(value: string) {

    return /(?:\d[\dXx* .-]{4,}\d|[Xx]{1,3}[- ]?[Xx*]{0,3}[- ]?\d{2,4}[- ]\d{1,4}|[Xx*]{1,3}[- ]\d{2,4})/.test(

        value,

    );

}



function stripAccount(value: string, account: string) {

    if (!account) return clean(value);



    return clean(

        value

            .replace(account, " ")

            .replace(/\s{2,}/g, " "),

    );

}



function isLikelyNewSection(line: string) {

    return /^(จาก|ไปยัง|ผู้โอน|ผู้รับ|จำนวนเงิน|ยอดโอน|ยอดเงิน|วันที่|เวลา|รหัสอ้างอิง|reference|หมายเหตุ|บันทึกช่วยจำ|ผู้รับเงินสามารถ|ผู้รับเงิน)/i.test(

        line,

    );

}



function collectValueAfterLabel(

    lines: string[],

    labels: string[],

) {

    for (let index = 0; index < lines.length; index += 1) {

        const current = normalizeLabelLine(lines[index]);



        for (const label of labels) {

            const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");



            const sameLine = current.match(

                new RegExp(

                    `^${escaped}\\s*[:：-]?\\s*(.+)$`,

                    "i",

                ),

            );



            if (!sameLine?.[1]) continue;



            const values = [clean(sameLine[1])];

            let nextIndex = index + 1;



            while (nextIndex < lines.length) {

                const next = clean(lines[nextIndex]);



                if (!next) {

                    nextIndex += 1;

                    continue;

                }



                if (isLikelyNewSection(next) || looksLikeAccount(next)) {

                    break;

                }



                // ชื่อคนในสลิปอาจถูกแบ่ง 2-3 บรรทัด

                values.push(next);

                nextIndex += 1;



                if (values.length >= 4) break;

            }



            return clean(values.join(" "));

        }



        // กรณี label อยู่เป็นบรรทัดเดี่ยว เช่น

        // "จาก" แล้วบรรทัดถัดไปเป็นชื่อ

        for (const label of labels) {

            if (current.toLowerCase() !== label.toLowerCase()) {

                continue;

            }



            const values: string[] = [];

            let nextIndex = index + 1;



            while (nextIndex < lines.length) {

                const next = clean(lines[nextIndex]);



                if (!next) {

                    nextIndex += 1;

                    continue;

                }



                if (isLikelyNewSection(next) || looksLikeAccount(next)) {

                    break;

                }



                values.push(next);

                nextIndex += 1;



                if (values.length >= 4) break;

            }



            return clean(values.join(" "));

        }

    }



    return "";

}



function canonicalizeOwnerName(

    value: string,

    ownerName: string,

) {

    if (!value || !ownerName) return value;



    const a = normalizeCompare(value);

    const b = normalizeCompare(ownerName);



    if (!a || !b) return value;



    if (a === b || a.includes(b) || b.includes(a)) {

        return `นางสาว ${ownerName}`;

    }



    // OCR often confuses a single Thai vowel/character.

    // Use a conservative edit-distance threshold for short account names.

    const distance = (left: string, right: string) => {

        const rows = left.length + 1;

        const cols = right.length + 1;

        const dp = Array.from({ length: rows }, () =>

            new Array<number>(cols).fill(0),

        );



        for (let i = 0; i < rows; i++) dp[i][0] = i;

        for (let j = 0; j < cols; j++) dp[0][j] = j;



        for (let i = 1; i < rows; i++) {

            for (let j = 1; j < cols; j++) {

                const cost = left[i - 1] === right[j - 1] ? 0 : 1;



                dp[i][j] = Math.min(

                    dp[i - 1][j] + 1,

                    dp[i][j - 1] + 1,

                    dp[i - 1][j - 1] + cost,

                );

            }

        }



        return dp[rows - 1][cols - 1];

    };



    if (b.length >= 8 && distance(a, b) <= 2) {

        const prefix =

            /^นางสาว\b/i.test(clean(value)) ? "นางสาว " : "";

        return `${prefix}${ownerName}`.trim();

    }



    return value;

}



function classifyTransaction(

    payerName: string,

    payerAccount: string,

    payeeName: string,

    payeeAccount: string,

    ownerName: string,

    ownerLast4: string,

): "income" | "expense" | "unknown" {

    const normalizedOwner = normalizeCompare(ownerName);

    const normalizedPayer = normalizeCompare(payerName);

    const normalizedPayee = normalizeCompare(payeeName);



    const cleanLast4 = ownerLast4.replace(/\D/g, "").slice(-4);



    const payerLast4 = payerAccount.replace(/\D/g, "").slice(-4);

    const payeeLast4 = payeeAccount.replace(/\D/g, "").slice(-4);



    const payerMatchesOwner =

        (normalizedOwner &&

            normalizedPayer &&

            normalizedPayer.includes(normalizedOwner)) ||

        (normalizedOwner &&

            normalizedPayer &&

            normalizedOwner.includes(normalizedPayer)) ||

        (!!cleanLast4 && payerLast4 === cleanLast4);



    const payeeMatchesOwner =

        (normalizedOwner &&

            normalizedPayee &&

            normalizedPayee.includes(normalizedOwner)) ||

        (normalizedOwner &&

            normalizedPayee &&

            normalizedOwner.includes(normalizedPayee)) ||

        (!!cleanLast4 && payeeLast4 === cleanLast4);



    if (payeeMatchesOwner && !payerMatchesOwner) {

        return "income";

    }



    if (payerMatchesOwner && !payeeMatchesOwner) {

        return "expense";

    }



    return "unknown";

}





function findNextNonEmptyLine(lines: string[], startIndex: number) {

    for (let index = startIndex + 1; index < lines.length; index += 1) {

        const value = clean(lines[index]);

        if (value) return { index, value };

    }



    return null;

}



function findPreviousNonEmptyLine(lines: string[], startIndex: number) {

    for (let index = startIndex - 1; index >= 0; index -= 1) {

        const value = clean(lines[index]);

        if (value) return { index, value };

    }



    return null;

}



function looksLikePersonName(value: string) {

    const text = clean(value);



    if (!text) return false;

    if (looksLikeAccount(text)) return false;

    if (/^(ธ\.?กสิกรไทย|กสิกรไทย|KBank|PromptPay|รหัสพร้อมเพย์|จำนวน|ค่าธรรมเนียม|เลขที่รายการ|เลขที่ทำรายการ|เลขที่ธุรกรรม|reference)$/i.test(text)) {

        return false;

    }



    // Thai person-name hints or common title.

    return /(?:นาย|นางสาว|นาง|น\.ส\.|นส\.|เด็กชาย|เด็กหญิง|มาสเตอร์|คุณ)\s*/i.test(

        text,

    ) || /[\u0E00-\u0E7F]{3,}\s+[\u0E00-\u0E7F]{1,}/.test(text);

}



function looksLikePayerParty(value: string) {

    const text = clean(value);

    if (!text) return false;
    if (looksLikeAccount(text)) return false;

    if (
        /^(ธ\s*\.?\s*กสิกรไทย|กสิกรไทย|KBank|KKP|Better|เกียรตินาคินภัทร|เกียรตินาคิน|PromptPay|พรอมต์เพย์|พร้อมเพย์|จำนวนเงิน|ยอดโอน|ยอดเงิน|วันที่|เวลา|รหัสอ้างอิง|reference|รหัสธุรกรรม)$/i.test(text)
    ) {
        return false;
    }

    if (
        /^(นาย|นางสาว|นาง|น\.ส\.|นส\.|เด็กชาย|เด็กหญิง|มาสเตอร์|คุณ|บจก\.?|บริษัท|หจก\.?|ห้างหุ้นส่วน|ร้าน|มูลนิธิ)\s*/i.test(text)
    ) {
        return true;
    }

    return /[\u0E00-\u0E7F]{2,}\s+[\u0E00-\u0E7F]{2,}/.test(text);
}

function findNearestAccountAround(
    lines: string[],
    centerIndex: number,
    radius = 3,
) {
    const start = Math.max(0, centerIndex - radius);
    const end = Math.min(lines.length - 1, centerIndex + radius);

    for (let i = centerIndex + 1; i <= end; i += 1) {
        const value = clean(lines[i]);
        if (looksLikeAccount(value)) return extractAccount(value);
    }

    for (let i = centerIndex - 1; i >= start; i -= 1) {
        const value = clean(lines[i]);
        if (looksLikeAccount(value)) return extractAccount(value);
    }

    return "";
}

function applyKBankSlipFallback(
    lines: string[],
    parsed: SlipData,
    ownerName: string,
    ownerLast4: string,
): SlipData {
    const next = { ...parsed };
    const cleanedLines = lines.map(clean).filter(Boolean);
    const normalizedOwner = normalizeCompare(ownerName);

    const kbankIndex = cleanedLines.findIndex((line) =>
        /ธ\s*\.?\s*กสิกรไทย|กสิกรไทย|KBank/i.test(clean(line)),
    );

    // This KBank/KKP transfer layout is:
    // [sender/owner] -> [sender account] -> [sender bank]
    // [recipient]    -> [recipient account] -> [recipient bank]
    // The KBank line therefore identifies the RECIPIENT block, not the payer.

    let ownerIndex = -1;
    if (normalizedOwner) {
        ownerIndex = cleanedLines.findIndex((line) => {
            const compared = normalizeCompare(line);
            return (
                compared &&
                (compared === normalizedOwner ||
                    compared.includes(normalizedOwner) ||
                    normalizedOwner.includes(compared))
            );
        });
    }

    let payerName = "";
    let payerAccount = "";
    let payeeName = "";
    let payeeAccount = "";

    // 1) The configured owner is the payer when the owner block is before
    // the recipient-bank block. Preserve the honorific exactly as OCR saw it.
    if (ownerIndex >= 0 && (kbankIndex < 0 || ownerIndex < kbankIndex)) {
        payerName = cleanedLines[ownerIndex];
        payerAccount = findNearestAccountAround(cleanedLines, ownerIndex, 3);
    }

    // 2) Recipient is the party immediately above the KBank line. Scan
    // backwards, skipping account lines and labels.
    if (kbankIndex >= 0) {
        for (
            let i = kbankIndex - 1;
            i >= Math.max(0, kbankIndex - 4);
            i -= 1
        ) {
            const value = clean(cleanedLines[i]);
            if (!value || looksLikeAccount(value)) continue;
            if (
                /^(ธ\s*\.?\s*กสิกรไทย|กสิกรไทย|KBank|จำนวนเงิน|ยอดโอน|ยอดเงิน|วันที่|เวลา|รหัสอ้างอิง|reference|รหัสธุรกรรม)$/i.test(
                    value,
                )
            ) {
                continue;
            }

            if (ownerIndex === i) continue;

            if (looksLikePayerParty(value) || looksLikePersonName(value)) {
                payeeName = value;
                payeeAccount = findNearestAccountAround(cleanedLines, i, 2);
                break;
            }
        }
    }

    // 3) If the configured owner was not found in the OCR text, retain the
    // configured owner as payer rather than falsely assigning it to payee.
    if (!payerName && ownerName) {
        payerName = clean(ownerName);
        if (ownerIndex >= 0) {
            payerAccount = findNearestAccountAround(cleanedLines, ownerIndex, 3);
        }
    }

    // 4) If recipient parsing above failed, use the generic parsed payee only
    // when it is clearly different from the owner. Never turn the owner into
    // the payee on this layout.
    if (!payeeName && next.payeeName && !looksLikeOwnerName(next.payeeName, ownerName)) {
        payeeName = clean(next.payeeName);
        payeeAccount = next.payeeAccount || "";
    }

    // 5) Determine the BANK from the payer/owner block first. This prevents a
    // transfer from KKP to KBank from being reported simply as "KBank".
    let sourceBank = "";
    if (ownerIndex >= 0) {
        const start = Math.max(0, ownerIndex - 1);
        const end = Math.min(cleanedLines.length - 1, ownerIndex + 4);
        const nearby = cleanedLines.slice(start, end + 1).join("\n");
        sourceBank = detectBank(nearby);
    }

    const bankName = sourceBank || parsed.bankName || "";

    const finalPayerName = payerName || next.payerName || "";
    const finalPayerAccount = payerAccount || next.payerAccount || "";
    const finalPayeeName = payeeName || "";
    const finalPayeeAccount = payeeAccount || "";

    return {
        ...next,
        bankName,
        payerName: finalPayerName,
        payerAccount: finalPayerAccount,
        payeeName: finalPayeeName,
        payeeAccount: finalPayeeAccount,
        transactionType: classifyTransaction(
            finalPayerName,
            finalPayerAccount,
            finalPayeeName,
            finalPayeeAccount,
            ownerName,
            ownerLast4,
        ),
    };
}

function levenshteinDistance(left: string, right: string) {
    const rows = left.length + 1;
    const cols = right.length + 1;
    const dp = Array.from({ length: rows }, () =>
        new Array<number>(cols).fill(0),
    );

    for (let i = 0; i < rows; i += 1) dp[i][0] = i;
    for (let j = 0; j < cols; j += 1) dp[0][j] = j;

    for (let i = 1; i < rows; i += 1) {
        for (let j = 1; j < cols; j += 1) {
            const cost = left[i - 1] === right[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost,
            );
        }
    }

    return dp[rows - 1][cols - 1];
}

function looksLikeOwnerName(value: string, ownerName: string) {
    const candidate = normalizeCompare(value);
    const owner = normalizeCompare(ownerName);
    if (!candidate || !owner) return false;

    if (candidate === owner || candidate.includes(owner) || owner.includes(candidate)) {
        return true;
    }

    return owner.length >= 8 && levenshteinDistance(candidate, owner) <= 3;
}

function extractMaskedOrNumericAccountNear(
    lines: string[],
    startIndex: number,
    endIndex: number,
) {
    const low = Math.max(0, Math.min(startIndex, endIndex));
    const high = Math.min(lines.length - 1, Math.max(startIndex, endIndex));

    for (let i = low; i <= high; i += 1) {
        const value = clean(lines[i]);
        if (looksLikeAccount(value)) {
            return extractAccount(value);
        }
    }

    return "";
}

function findKKPRecipient(lines: string[]) {
    // The supplied KKP Better slip uses the distinctive recipient pattern
    // "มาสเตอร์ 6131416" followed by a numeric ID/account. OCR.space may
    // omit the final Thai mark or the space, so keep this deliberately fuzzy.
    const recipientRegex = /(มาสเตอร(?:์)?|มาสเตอร์|Master)\s*([0-9๐-๙]{4,})/i;
    const flattened = lines.join(" ");
    const flattenedMatch = flattened.match(recipientRegex);

    if (flattenedMatch) {
        const digits = normalizeThaiDigits(flattenedMatch[2]);
        const payeeName = `มาสเตอร์ ${digits}`;
        const index = lines.findIndex((line) => {
            return recipientRegex.test(clean(line)) ||
                normalizeCompare(line).includes(normalizeCompare(payeeName));
        });

        let payeeAccount = index >= 0
            ? extractMaskedOrNumericAccountNear(lines, index + 1, index + 5)
            : "";

        if (!payeeAccount) {
            const flatStart = flattened.indexOf(flattenedMatch[0]);
            if (flatStart >= 0) {
                const tail = flattened.slice(flatStart + flattenedMatch[0].length);
                const accountMatch = tail.match(/(?:^|\s)(\d{8,20})(?=\s|$)/);
                if (accountMatch) payeeAccount = accountMatch[1];
            }
        }

        return { payeeName, payeeAccount, index };
    }

    for (let i = 0; i < lines.length; i += 1) {
        const value = clean(lines[i]);
        const typoMatch = value.match(/^(?:มาสเตอร|Master)\s*([0-9๐-๙]{4,})/i);
        if (!typoMatch) continue;

        const digits = normalizeThaiDigits(typoMatch[1]);
        const payeeName = `มาสเตอร์ ${digits}`;
        const payeeAccount = extractMaskedOrNumericAccountNear(lines, i + 1, i + 5);
        return { payeeName, payeeAccount, index: i };
    }

    return { payeeName: "", payeeAccount: "", index: -1 };
}

function applyKKPSlipFallback(
    lines: string[],
    parsed: SlipData,
    ownerName: string,
    ownerLast4: string,
): SlipData {
    const cleanedLines = lines.map(clean).filter(Boolean);

    const kkpIndex = cleanedLines.findIndex((line) =>
        /KKP|Better|เกียรตินาคินภัทร|เกียรตินาคิน|Kiatnakin/i.test(line),
    );

    // 1) Always prioritize the KKP-specific recipient marker over the generic
    // parser. This prevents the owner's name from being mislabeled as payee.
    const recipient = findKKPRecipient(cleanedLines);

    let payeeName = recipient.payeeName;
    let payeeAccount = recipient.payeeAccount;

    if (!payeeName && kkpIndex >= 0) {
        // Generic recipient search after the bank line, but never use the
        // configured owner name as the recipient merely because OCR matched it.
        for (let i = kkpIndex + 1; i < cleanedLines.length; i += 1) {
            const value = clean(cleanedLines[i]);
            if (!value || looksLikeAccount(value)) continue;
            if (looksLikeOwnerName(value, ownerName)) continue;
            if (/KKP|Better|เกียรตินาคิน|จ่ายบิลสำเร็จ|รหัส|reference|จำนวนเงิน|ยอดเงิน|THB|บาท/i.test(value)) {
                continue;
            }
            if (looksLikePersonName(value)) {
                payeeName = value;
                payeeAccount = extractMaskedOrNumericAccountNear(
                    cleanedLines,
                    i + 1,
                    i + 5,
                );
                break;
            }
        }
    }

    // 2) Payer: the account owner is the strongest signal on this site.
    // Prefer the owner's visible OCR line when it occurs before the KKP bank
    // line; otherwise use the configured account name as a safe KKP fallback.
    let payerName = "";
    let payerAccount = "";

    const ownerIndex = ownerName
        ? cleanedLines.findIndex((line) => looksLikeOwnerName(line, ownerName))
        : -1;

    if (ownerIndex >= 0 && (kkpIndex < 0 || ownerIndex < kkpIndex)) {
        payerName = ownerName;
        payerAccount = extractMaskedOrNumericAccountNear(
            cleanedLines,
            Math.max(0, ownerIndex - 1),
            Math.min(cleanedLines.length - 1, ownerIndex + 3),
        );
    }

    if (!payerName && ownerName && payeeName &&
        !looksLikeOwnerName(payeeName, ownerName)) {
        payerName = ownerName;
    }

    if (!payerAccount && payerName) {
        const payerAnchor = ownerIndex >= 0 ? ownerIndex : kkpIndex;
        if (payerAnchor >= 0) {
            payerAccount = extractMaskedOrNumericAccountNear(
                cleanedLines,
                Math.max(0, payerAnchor - 2),
                Math.max(0, payerAnchor + 2),
            );
        }
    }

    // If the OCR parser somehow found the owner's name as payee, never keep it
    // when a distinct KKP recipient was identified.
    if (
        payeeName &&
        ownerName &&
        looksLikeOwnerName(payeeName, ownerName) &&
        recipient.payeeName
    ) {
        payeeName = recipient.payeeName;
        payeeAccount = recipient.payeeAccount;
    }

    return {
        ...parsed,
        bankName: parsed.bankName || "KKP",
        payerName: payerName || parsed.payerName || "",
        payerAccount: payerAccount || parsed.payerAccount || "",
        payeeName: payeeName || "",
        payeeAccount: payeeAccount || "",
        transactionType: classifyTransaction(
            payerName || parsed.payerName || "",
            payerAccount || parsed.payerAccount || "",
            payeeName,
            payeeAccount,
            ownerName,
            ownerLast4,
        ),
    };
}


function parseSlipText(

    text: string,

    ownerName: string,

    ownerLast4: string,

): SlipData {

    const lines = text

        .split(/\r?\n/)

        .map(clean)

        .filter(Boolean);



    const normalizedText = lines.join("\n");



    const payerValue = collectValueAfterLabel(lines, [

        "จาก",

        "ผู้โอน",

        "ผู้ส่ง",

        "บัญชีผู้โอน",

        "ผู้โอนเงิน",

        "จากบัญชี",

        "payer",

        "sender",

    ]);



    const payeeValue = collectValueAfterLabel(lines, [

        "ไปยัง",

        "ผู้รับ",

        "ผู้รับเงิน",

        "ผู้รับโอน",

        "ถึง",

        "บัญชีผู้รับ",

        "ไปยังบัญชี",

        "payee",

        "receiver",

    ]);



    const payerAccount = extractAccount(payerValue);

    const payeeAccount = extractAccount(payeeValue);



    const rawPayerName = stripAccount(payerValue, payerAccount);

    const payerName = canonicalizeOwnerName(

        rawPayerName,

        ownerName,

    );



    const rawPayeeName = stripAccount(payeeValue, payeeAccount);

    const payeeName = canonicalizeOwnerName(

        rawPayeeName,

        ownerName,

    );



    return {

        bankName: detectBank(normalizedText),

        transactionType: classifyTransaction(

            payerName,

            payerAccount,

            payeeName,

            payeeAccount,

            ownerName,

            ownerLast4,

        ),

        payerName,

        payerAccount,

        payeeName,

        payeeAccount,

        transferDate: extractDate(normalizedText),

        transferTime: extractTime(normalizedText),

        amount: extractMoney(normalizedText),

    };

}



export async function POST(request: Request) {

    try {

        const apiKey = process.env.OCR_SPACE_API_KEY;



        if (!apiKey) {

            return NextResponse.json(

                {

                    error:

                        "ยังไม่ได้ตั้งค่า OCR_SPACE_API_KEY ใน environment variables",

                },

                { status: 500 },

            );

        }



        const formData = await request.formData();

        const file = formData.get("file");



        if (!(file instanceof File)) {

            return NextResponse.json(

                { error: "ไม่พบไฟล์สลิป" },

                { status: 400 },

            );

        }



        if (!IMAGE_TYPES.has(file.type)) {

            return NextResponse.json(

                {

                    error:

                        "สลิปต้องเป็นไฟล์ JPG, PNG, WEBP หรือ GIF",

                },

                { status: 400 },

            );

        }



        if (file.size > MAX_FILE_SIZE) {

            return NextResponse.json(

                { error: "ไฟล์สลิปมีขนาดเกิน 4 MB" },

                { status: 400 },

            );

        }



        const ownerName = clean(

            String(formData.get("accountName") ?? ""),

        );



        const ownerLast4 = clean(

            String(formData.get("accountNumberLast4") ?? ""),

        );



        const ocrForm = new FormData();

        ocrForm.append("file", file, file.name);

        ocrForm.append("language", "auto");

        ocrForm.append("OCREngine", "2");

        ocrForm.append("isOverlayRequired", "false");

        ocrForm.append("isTable", "true");

        ocrForm.append("detectOrientation", "true");

        ocrForm.append("scale", "true");



        let ocrResponse: Response;



        try {

            ocrResponse = await fetch(

                "https://api.ocr.space/parse/image",

                {

                    method: "POST",

                    headers: { apikey: apiKey },

                    body: ocrForm,

                    cache: "no-store",

                },

            );

        } catch (error) {

            console.error("OCR.space fetch failed:", error);



            return NextResponse.json(

                {

                    error:

                        "เชื่อมต่อ OCR.space ไม่สำเร็จ: " +

                        (error instanceof Error

                            ? error.message

                            : String(error)),

                },

                { status: 502 },

            );

        }



        const responseText = await ocrResponse.text();



        let ocrData: any;



        try {

            ocrData = JSON.parse(responseText);

        } catch (error) {

            console.error(

                "OCR.space returned non-JSON:",

                responseText.slice(0, 1000),

            );



            return NextResponse.json(

                {

                    error:

                        `OCR.space ตอบกลับผิดรูปแบบ (HTTP ${ocrResponse.status}). ` +

                        `รายละเอียด: ${responseText.slice(0, 300)}`,

                },

                { status: 502 },

            );

        }



        if (!ocrResponse.ok || ocrData?.IsErroredOnProcessing) {

            console.error("OCR.space API error:", ocrData);



            const apiError = Array.isArray(

                ocrData?.ErrorMessage,

            )

                ? ocrData.ErrorMessage.join(" ")

                : String(

                    ocrData?.ErrorMessage ?? "",

                );



            return NextResponse.json(

                {

                    error:

                        apiError ||

                        `OCR.space อ่านข้อมูลจากสลิปไม่สำเร็จ (HTTP ${ocrResponse.status})`,

                },

                { status: 502 },

            );

        }



        const parsedResults = Array.isArray(

            ocrData?.ParsedResults,

        )

            ? ocrData.ParsedResults

            : [];



        const text = parsedResults

            .map(

                (result: { ParsedText?: string }) =>

                    result?.ParsedText ?? "",

            )

            .join("\n")

            .trim();



        if (!text) {

            return NextResponse.json(

                {

                    error:

                        "ไม่พบข้อความในสลิป กรุณาลองใช้ภาพที่คมชัดขึ้น",

                },

                { status: 422 },

            );

        }



        console.log("OCR.space raw text:\n", text);



        let parsed = parseSlipText(

            text,

            ownerName,

            ownerLast4,

        );



        if (parsed.bankName === "KBank") {

            parsed = applyKBankSlipFallback(

                text.split(/\r?\n/).map(clean).filter(Boolean),

                parsed,

                ownerName,

                ownerLast4,

            );

        }



        if (parsed.bankName === "KKP") {

            parsed = applyKKPSlipFallback(

                text.split(/\r?\n/).map(clean).filter(Boolean),

                parsed,

                ownerName,

                ownerLast4,

            );

        }



        if (!parsed.transferDate) {

            const fallbackDate = extractDateFromCompactReference(text);



            if (fallbackDate) {

                parsed = {

                    ...parsed,

                    transferDate: fallbackDate,

                };

            }

        }



        if (!parsed.bankName && detectScbSlipMarker(text)) {

            parsed = {

                ...parsed,

                bankName: "SCB",

            };

        }



        if (!parsed.transferDate || !parsed.transferTime) {

            try {

                const thaiForm = new FormData();

                thaiForm.append("file", file, file.name);

                thaiForm.append("language", "tha");

                thaiForm.append("OCREngine", "2");

                thaiForm.append("isOverlayRequired", "false");

                thaiForm.append("isTable", "false");

                thaiForm.append("detectOrientation", "true");

                thaiForm.append("scale", "true");



                const thaiResponse = await fetch(

                    "https://api.ocr.space/parse/image",

                    {

                        method: "POST",

                        headers: { apikey: apiKey },

                        body: thaiForm,

                        cache: "no-store",

                    },

                );



                if (thaiResponse.ok) {

                    const thaiTextResponse = await thaiResponse.text();



                    try {

                        const thaiData = JSON.parse(thaiTextResponse);



                        if (!thaiData?.IsErroredOnProcessing) {

                            const thaiText = Array.isArray(

                                thaiData?.ParsedResults,

                            )

                                ? thaiData.ParsedResults

                                    .map(

                                        (result: { ParsedText?: string }) =>

                                            result?.ParsedText ?? "",

                                    )

                                    .join("\n")

                                : "";



                            const thaiDate = parsed.transferDate

                                ? ""

                                : extractDate(thaiText);

                            const thaiTime = parsed.transferTime

                                ? ""

                                : extractTime(thaiText);



                            if (thaiDate || thaiTime) {

                                parsed = {

                                    ...parsed,

                                    transferDate: parsed.transferDate || thaiDate,

                                    transferTime: parsed.transferTime || thaiTime,

                                };

                            }



                            console.log(

                                "OCR.space Thai pass text:\n",

                                thaiText,

                            );



                            if (parsed.bankName === "KBank" || parsed.bankName === "KKP") {

                                const mergedLines = [

                                    ...text.split(/\r?\n/).map(clean).filter(Boolean),

                                    ...thaiText.split(/\r?\n/).map(clean).filter(Boolean),

                                ];



                                if (parsed.bankName === "KBank") {

                                    parsed = applyKBankSlipFallback(

                                        mergedLines,

                                        parsed,

                                        ownerName,

                                        ownerLast4,

                                    );

                                } else {

                                    parsed = applyKKPSlipFallback(

                                        mergedLines,

                                        parsed,

                                        ownerName,

                                        ownerLast4,

                                    );

                                }

                            }

                        }

                    } catch {

                        console.warn(

                            "OCR.space Thai pass returned non-JSON",

                        );

                    }

                }

            } catch (error) {

                console.warn(

                    "OCR.space Thai date/time pass failed:",

                    error,

                );

            }

        }



        if (!parsed.bankName) {

            try {

                const bankForm = new FormData();

                bankForm.append("file", file, file.name);

                bankForm.append("language", "eng");

                bankForm.append("OCREngine", "2");

                bankForm.append("isOverlayRequired", "false");

                bankForm.append("isTable", "false");

                bankForm.append("detectOrientation", "true");

                bankForm.append("scale", "true");



                const bankResponse = await fetch(

                    "https://api.ocr.space/parse/image",

                    {

                        method: "POST",

                        headers: { apikey: apiKey },

                        body: bankForm,

                        cache: "no-store",

                    },

                );



                if (bankResponse.ok) {

                    const bankTextResponse = await bankResponse.text();



                    try {

                        const bankData = JSON.parse(bankTextResponse);



                        if (!bankData?.IsErroredOnProcessing) {

                            const bankText = Array.isArray(

                                bankData?.ParsedResults,

                            )

                                ? bankData.ParsedResults

                                    .map(

                                        (result: { ParsedText?: string }) =>

                                            result?.ParsedText ?? "",

                                    )

                                    .join("\n")

                                : "";



                            const detectedBank = detectBank(bankText);



                            if (detectedBank) {

                                parsed = {

                                    ...parsed,

                                    bankName: detectedBank,

                                };



                                if (detectedBank === "KKP") {

                                    parsed = applyKKPSlipFallback(

                                        bankText.split(/\r?\n/).map(clean).filter(Boolean),

                                        parsed,

                                        ownerName,

                                        ownerLast4,

                                    );

                                }

                            }



                            console.log(

                                "OCR.space bank pass text:\n",

                                bankText,

                            );

                        }

                    } catch {

                        console.warn(

                            "OCR.space bank pass returned non-JSON",

                        );

                    }

                }

            } catch (error) {

                console.warn(

                    "OCR.space bank detection pass failed:",

                    error,

                );

            }

        }



        const transactionTypeLabel =

            parsed.transactionType === "income"

                ? "เงินเข้า"

                : parsed.transactionType === "expense"

                    ? "เงินออก"

                    : "ไม่ระบุ";



        return NextResponse.json({

            // field หลักสำหรับ frontend

            bankName: parsed.bankName || "",

            transactionType: parsed.transactionType,

            payerName: parsed.payerName,

            payerAccount: parsed.payerAccount,

            payeeName: parsed.payeeName,

            payeeAccount: parsed.payeeAccount,

            transferDate: parsed.transferDate,

            transferTime: parsed.transferTime,

            amount: parsed.amount,



            slip: parsed,



            // เก็บ raw OCR ไว้ตรวจสอบ parser โดยไม่กระทบ field หลัก

            rawText: text,



            // ชื่อสำหรับแสดงผลในหน้า OCR / Debug

            display: {

                "ธนาคาร": parsed.bankName || "ไม่พบข้อมูล",

                "ประเภท": transactionTypeLabel,

                "ผู้โอน": parsed.payerName || "ไม่พบข้อมูล",

                "ผู้รับ": parsed.payeeName || "ไม่พบข้อมูล",

                "วันที่": parsed.transferDate || "ไม่พบข้อมูล",

                "เวลา": parsed.transferTime || "ไม่พบข้อมูล",

                "จำนวนเงิน":

                    parsed.amount !== null

                        ? `฿${parsed.amount.toLocaleString("th-TH", {

                            minimumFractionDigits: 2,

                            maximumFractionDigits: 2,

                        })}`

                        : "ไม่พบข้อมูล",

            },

        });

    } catch (error) {

        console.error("OCR slip route error:", error);



        return NextResponse.json(

            {

                error:

                    "เกิดข้อผิดพลาดระหว่างอ่านข้อมูลจากสลิป: " +

                    (error instanceof Error

                        ? error.message

                        : String(error)),

            },

            { status: 500 },

        );

    }

}
