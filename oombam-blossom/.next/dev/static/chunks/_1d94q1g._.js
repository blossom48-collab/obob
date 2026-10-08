(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* =========================================================
   OomBam Blossom FC
   Next.js + Supabase
   Supabase only
   ========================================================= */ "use client";
;
;
;
;
const DEFAULT_SCHEDULE_URL = "https://lh3.googleusercontent.com/d/1hHGB04z7b-y1IuuBrl3X2CkLUpM1BAAX=s0";
function formatMoney(value) {
    return value.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function formatDate(date) {
    if (!date) return "—";
    const value = new Date(`${date}T00:00:00`);
    if (Number.isNaN(value.getTime())) return date;
    return value.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
function getDriveFileId(url) {
    const value = url.trim();
    if (!value) return null;
    const patterns = [
        /drive\.google\.com\/file\/d\/([^/]+)/i,
        /[?&]id=([^&]+)/i,
        /lh3\.googleusercontent\.com\/d\/([^=/?]+)/i
    ];
    for (const pattern of patterns){
        const match = value.match(pattern);
        if (match?.[1]) return match[1];
    }
    return null;
}
function getDriveImageUrl(url) {
    const fileId = getDriveFileId(url);
    if (!fileId) return url.trim();
    return `https://lh3.googleusercontent.com/d/${fileId}=w1600`;
}
function getDriveThumbUrl(url) {
    const fileId = getDriveFileId(url);
    if (!fileId) return url.trim();
    return `https://lh3.googleusercontent.com/d/${fileId}=w320`;
}
function getScheduleImageUrl(url) {
    if (!url.trim()) return DEFAULT_SCHEDULE_URL;
    const driveId = url.match(/\/d\/([\w-]+)/)?.[1] ?? url.match(/[?&]id=([\w-]+)/)?.[1];
    return driveId ? `https://lh3.googleusercontent.com/d/${driveId}=s0` : url;
}
function getQrImageUrl(url) {
    if (!url.trim()) return "";
    const driveId = url.match(/\/d\/([\w-]+)/)?.[1] ?? url.match(/[?&]id=([\w-]+)/)?.[1];
    // ใช้วิธีเดียวกับภาพตารางงานที่แสดงได้อยู่แล้ว
    return driveId ? `https://lh3.googleusercontent.com/d/${driveId}=s0` : url;
}
function isImageAttachment(attachment) {
    if (attachment.mimeType.startsWith("image/")) return true;
    return /\.(jpe?g|png|webp|gif)$/i.test(attachment.name);
}
function getAttachmentImagePreviewUrl(attachment) {
    const id = attachment.id || getDriveFileId(attachment.webViewLink) || "";
    return id.startsWith("legacy-") ? attachment.webViewLink : `https://lh3.googleusercontent.com/d/${id}=s0`;
}
function getAttachmentDownloadUrl(attachment) {
    return attachment.webContentLink || attachment.webViewLink;
}
function mapEvent(row) {
    return {
        id: row.id,
        name: row.name,
        desc: row.description ?? "",
        imageFolderUrl: row.image_folder_url ?? "",
        scheduleUrl: row.schedule_url ?? "",
        eventDate: row.event_date ?? null,
        createdAt: row.created_at
    };
}
function mapTransaction(row) {
    const rawAttachments = Array.isArray(row.attachments) ? row.attachments : [];
    const attachments = rawAttachments.filter((item)=>!!item && typeof item === "object" && typeof item.id === "string" && typeof item.name === "string" && typeof item.mimeType === "string").map((item)=>({
            id: String(item.id),
            name: String(item.name),
            mimeType: String(item.mimeType),
            webViewLink: typeof item.webViewLink === "string" ? item.webViewLink : `https://drive.google.com/file/d/${String(item.id)}/view`,
            webContentLink: typeof item.webContentLink === "string" ? item.webContentLink : null,
            category: item.category === "slip" || item.category === "document" ? item.category : undefined
        }));
    // รองรับข้อมูลเก่าแบบไฟล์เดียวจาก attachment_url / attachment_name
    if (attachments.length === 0 && row.attachment_url && row.attachment_name) {
        const id = row.attachment_url.match(/\/d\/([\w-]+)/)?.[1] ?? row.attachment_url.match(/[?&]id=([\w-]+)/)?.[1];
        attachments.push({
            id: id ?? `legacy-${row.id}`,
            name: row.attachment_name,
            mimeType: "application/octet-stream",
            webViewLink: row.attachment_url,
            webContentLink: null
        });
    }
    const rawSlipData = row.slip_data && typeof row.slip_data === "object" ? row.slip_data : null;
    const slipData = rawSlipData ? {
        bankName: String(rawSlipData.bankName ?? ""),
        transactionType: rawSlipData.transactionType === "income" || rawSlipData.transactionType === "expense" ? rawSlipData.transactionType : "unknown",
        payerName: String(rawSlipData.payerName ?? ""),
        payerAccount: String(rawSlipData.payerAccount ?? ""),
        payeeName: String(rawSlipData.payeeName ?? ""),
        payeeAccount: String(rawSlipData.payeeAccount ?? ""),
        transferDate: String(rawSlipData.transferDate ?? ""),
        transferTime: String(rawSlipData.transferTime ?? ""),
        amount: rawSlipData.amount === null || rawSlipData.amount === undefined ? null : Number(rawSlipData.amount)
    } : null;
    return {
        id: row.id,
        eventId: row.event_id,
        date: row.date,
        time: row.time ?? "",
        type: row.type,
        desc: row.description,
        amount: Number(row.amount),
        note: row.note ?? "",
        attachments,
        slipData,
        createdAt: row.created_at
    };
}
function Home({ initialEventId } = {}) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [supabase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Home.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])()
    }["Home.useState"]);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedEventId, setSelectedEventId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialEventId ?? null);
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdmin, setIsAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loginEmail, setLoginEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loginPassword, setLoginPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loginError, setLoginError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoginModalOpen, setIsLoginModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEventModalOpen, setIsEventModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingEventId, setEditingEventId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [eventName, setEventName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [eventDate, setEventDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [eventDesc, setEventDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [imageFolderUrl, setImageFolderUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [scheduleUrl, setScheduleUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedImageIndex, setSelectedImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingTransactionId, setEditingTransactionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactionDate, setTransactionDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [transactionTime, setTransactionTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [transactionType, setTransactionType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("income");
    const [transactionDesc, setTransactionDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [transactionAmount, setTransactionAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [transactionNote, setTransactionNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [transactionSlipFile, setTransactionSlipFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactionSlipData, setTransactionSlipData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isReadingSlip, setIsReadingSlip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slipError, setSlipError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [transactionAttachments, setTransactionAttachments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [transactionExistingAttachments, setTransactionExistingAttachments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [attachmentError, setAttachmentError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isUploadingAttachment, setIsUploadingAttachment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [attachmentUploadProgress, setAttachmentUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [previewAttachment, setPreviewAttachment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSchedulePreviewOpen, setIsSchedulePreviewOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transactionFilter, setTransactionFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [qrUrl, setQrUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [qrInput, setQrInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isQrModalOpen, setIsQrModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bankName, setBankName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [bankAccountNumber, setBankAccountNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [bankAccountName, setBankAccountName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [toastMessage, setToastMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedEventImages, setSelectedEventImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingEventImages, setIsLoadingEventImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [eventImagesError, setEventImagesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const selectedEvent = events.find((event)=>event.id === selectedEventId) ?? null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            let cancelled = false;
            async function loadEventImages() {
                const folderUrl = selectedEvent?.imageFolderUrl?.trim() ?? "";
                setSelectedImageIndex(0);
                setSelectedEventImages([]);
                setEventImagesError("");
                if (!folderUrl) {
                    setIsLoadingEventImages(false);
                    return;
                }
                setIsLoadingEventImages(true);
                try {
                    const response = await fetch(`/api/drive-images?folder=${encodeURIComponent(folderUrl)}`, {
                        cache: "no-store"
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data?.error || "โหลดรูปจาก Google Drive ไม่สำเร็จ");
                    }
                    if (!cancelled) {
                        setSelectedEventImages(Array.isArray(data?.images) ? data.images : []);
                    }
                } catch (error) {
                    console.error("โหลดรูป Event ไม่สำเร็จ:", error);
                    if (!cancelled) {
                        setEventImagesError(error instanceof Error ? error.message : "โหลดรูปจาก Google Drive ไม่สำเร็จ");
                    }
                } finally{
                    if (!cancelled) {
                        setIsLoadingEventImages(false);
                    }
                }
            }
            loadEventImages();
            return ({
                "Home.useEffect": ()=>{
                    cancelled = true;
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        selectedEvent?.imageFolderUrl
    ]);
    const globalStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[globalStats]": ()=>{
            const income = transactions.filter({
                "Home.useMemo[globalStats].income": (transaction)=>transaction.type === "income"
            }["Home.useMemo[globalStats].income"]).reduce({
                "Home.useMemo[globalStats].income": (sum, transaction)=>sum + Number(transaction.amount)
            }["Home.useMemo[globalStats].income"], 0);
            const expense = transactions.filter({
                "Home.useMemo[globalStats].expense": (transaction)=>transaction.type === "expense"
            }["Home.useMemo[globalStats].expense"]).reduce({
                "Home.useMemo[globalStats].expense": (sum, transaction)=>sum + Number(transaction.amount)
            }["Home.useMemo[globalStats].expense"], 0);
            return {
                income,
                expense,
                balance: income - expense
            };
        }
    }["Home.useMemo[globalStats]"], [
        transactions
    ]);
    const selectedEventStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[selectedEventStats]": ()=>{
            if (!selectedEventId) {
                return {
                    income: 0,
                    expense: 0,
                    balance: 0,
                    count: 0
                };
            }
            const eventTransactions = transactions.filter({
                "Home.useMemo[selectedEventStats].eventTransactions": (transaction)=>transaction.eventId === selectedEventId
            }["Home.useMemo[selectedEventStats].eventTransactions"]);
            const income = eventTransactions.filter({
                "Home.useMemo[selectedEventStats].income": (transaction)=>transaction.type === "income"
            }["Home.useMemo[selectedEventStats].income"]).reduce({
                "Home.useMemo[selectedEventStats].income": (sum, transaction)=>sum + Number(transaction.amount)
            }["Home.useMemo[selectedEventStats].income"], 0);
            const expense = eventTransactions.filter({
                "Home.useMemo[selectedEventStats].expense": (transaction)=>transaction.type === "expense"
            }["Home.useMemo[selectedEventStats].expense"]).reduce({
                "Home.useMemo[selectedEventStats].expense": (sum, transaction)=>sum + Number(transaction.amount)
            }["Home.useMemo[selectedEventStats].expense"], 0);
            return {
                income,
                expense,
                balance: income - expense,
                count: eventTransactions.length
            };
        }
    }["Home.useMemo[selectedEventStats]"], [
        selectedEventId,
        transactions
    ]);
    const filteredTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[filteredTransactions]": ()=>{
            if (!selectedEventId) return [];
            return transactions.filter({
                "Home.useMemo[filteredTransactions]": (transaction)=>transaction.eventId === selectedEventId
            }["Home.useMemo[filteredTransactions]"]).filter({
                "Home.useMemo[filteredTransactions]": (transaction)=>transactionFilter ? transaction.type === transactionFilter : true
            }["Home.useMemo[filteredTransactions]"]).sort({
                "Home.useMemo[filteredTransactions]": (a, b)=>{
                    const dateCompare = b.date.localeCompare(a.date);
                    if (dateCompare !== 0) return dateCompare;
                    const timeCompare = (b.time || "").localeCompare(a.time || "");
                    if (timeCompare !== 0) return timeCompare;
                    return b.createdAt.localeCompare(a.createdAt);
                }
            }["Home.useMemo[filteredTransactions]"]);
        }
    }["Home.useMemo[filteredTransactions]"], [
        selectedEventId,
        transactionFilter,
        transactions
    ]);
    async function loadData() {
        const [{ data: sessionData }, { data: eventRows, error: eventsError }, { data: transactionRows, error: transactionsError }, { data: settingRows, error: settingsError }] = await Promise.all([
            supabase.auth.getSession(),
            supabase.from("events").select("id, name, event_date, description, image_folder_url, schedule_url, created_at").order("event_date", {
                ascending: false,
                nullsFirst: false
            }),
            supabase.from("transactions").select("id, event_id, date, time, type, description, amount, note, attachments, slip_data, attachment_url, attachment_name, created_at").order("date", {
                ascending: false
            }),
            supabase.from("settings").select("key, value, updated_at").in("key", [
                "qr_url",
                "bank_name",
                "bank_account_number",
                "bank_account_name"
            ])
        ]);
        if (eventsError) {
            console.error("โหลด Event ไม่สำเร็จ:", eventsError);
            setEvents([]);
        } else {
            setEvents((eventRows ?? []).map((row)=>mapEvent(row)));
        }
        if (transactionsError) {
            console.error("โหลด Transaction ไม่สำเร็จ:", transactionsError);
            setTransactions([]);
        } else {
            setTransactions((transactionRows ?? []).map((row)=>mapTransaction(row)));
        }
        if (settingsError) {
            console.error("โหลด Settings ไม่สำเร็จ:", settingsError);
            setQrUrl("");
            setBankName("");
            setBankAccountNumber("");
            setBankAccountName("");
        } else {
            const settings = (settingRows ?? []).reduce((result, row)=>{
                result[row.key] = row.value ?? "";
                return result;
            }, {});
            setQrUrl(settings.qr_url ?? "");
            setBankName(settings.bank_name ?? "");
            setBankAccountNumber(settings.bank_account_number ?? "");
            setBankAccountName(settings.bank_account_name ?? "");
        }
        setIsAdmin(!!sessionData.session);
        setIsReady(true);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            void loadData();
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "Home.useEffect": (_event, session)=>{
                    setIsAdmin(!!session);
                }
            }["Home.useEffect"]);
            return ({
                "Home.useEffect": ()=>{
                    subscription.unsubscribe();
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        supabase
    ]);
    function openLoginModal() {
        setLoginEmail("");
        setLoginPassword("");
        setLoginError("");
        setIsLoginModalOpen(true);
    }
    function closeLoginModal() {
        setIsLoginModalOpen(false);
        setLoginEmail("");
        setLoginPassword("");
        setLoginError("");
    }
    async function doLogin() {
        const email = loginEmail.trim();
        if (!email) {
            setLoginError("กรุณาใส่อีเมล");
            return;
        }
        if (!loginPassword) {
            setLoginError("กรุณาใส่รหัสผ่าน");
            return;
        }
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: loginPassword
        });
        if (error) {
            console.error("Login failed:", error);
            setLoginError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
            return;
        }
        setIsAdmin(true);
        closeLoginModal();
    }
    async function doLogout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout failed:", error);
            return;
        }
        setIsAdmin(false);
    }
    function resetEventForm() {
        setEditingEventId(null);
        setEventName("");
        setEventDate("");
        setEventDesc("");
        setImageFolderUrl("");
        setScheduleUrl("");
    }
    function openCreateEventModal() {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        resetEventForm();
        setIsEventModalOpen(true);
    }
    function openEditEventModal(event) {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        setEditingEventId(event.id);
        setEventName(event.name);
        setEventDate(event.eventDate ?? "");
        setEventDesc(event.desc);
        setImageFolderUrl(event.imageFolderUrl);
        setScheduleUrl(event.scheduleUrl);
        setIsEventModalOpen(true);
    }
    function closeEventModal() {
        setIsEventModalOpen(false);
        resetEventForm();
    }
    async function saveEvent() {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        const cleanName = eventName.trim();
        if (!cleanName) {
            alert("กรุณาใส่ชื่อ Event");
            return;
        }
        if (!eventDate) {
            alert("กรุณาเลือกวันที่ Event");
            return;
        }
        if (editingEventId) {
            const { data, error } = await supabase.from("events").update({
                name: cleanName,
                event_date: eventDate,
                description: eventDesc.trim() || null,
                image_folder_url: imageFolderUrl.trim() || null,
                schedule_url: scheduleUrl.trim() || null,
                updated_at: new Date().toISOString()
            }).eq("id", editingEventId).select("id, name, event_date, description, image_folder_url, schedule_url, created_at").single();
            if (error || !data) {
                console.error("แก้ไข Event ไม่สำเร็จ:", error);
                alert(`แก้ไข Event ไม่สำเร็จ\n${error?.message ?? "ไม่พบข้อมูล Event"}`);
                return;
            }
            const updatedEvent = mapEvent(data);
            setEvents((current)=>current.map((event)=>event.id === editingEventId ? updatedEvent : event));
        } else {
            const { data, error } = await supabase.from("events").insert({
                name: cleanName,
                event_date: eventDate,
                description: eventDesc.trim() || null,
                image_folder_url: imageFolderUrl.trim() || null,
                schedule_url: scheduleUrl.trim() || null
            }).select("id, name, event_date, description, image_folder_url, schedule_url, created_at").single();
            if (error || !data) {
                console.error("สร้าง Event ไม่สำเร็จ:", error);
                alert(`สร้าง Event ไม่สำเร็จ\n${error?.message ?? "ไม่พบข้อมูลที่สร้าง"}`);
                return;
            }
            setEvents((current)=>[
                    mapEvent(data),
                    ...current
                ]);
        }
        closeEventModal();
    }
    async function deleteEvent(id) {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        const event = events.find((item)=>item.id === id);
        if (!event) return;
        const confirmed = window.confirm(`ลบ Event "${event.name}" ใช่หรือไม่?\n\nการดำเนินการนี้ไม่สามารถย้อนกลับได้`);
        if (!confirmed) return;
        const { error } = await supabase.from("events").delete().eq("id", id);
        if (error) {
            console.error("ลบ Event ไม่สำเร็จ:", error);
            alert(`ลบ Event ไม่สำเร็จ\n${error.message}`);
            return;
        }
        setEvents((current)=>current.filter((item)=>item.id !== id));
        setTransactions((current)=>current.filter((transaction)=>transaction.eventId !== id));
        if (selectedEventId === id) {
            setSelectedEventId(null);
            router.push("/");
        }
    }
    function openEventDetail(id) {
        setTransactionFilter("");
        router.push(`/events/${id}`);
    }
    function resetTransactionForm() {
        setEditingTransactionId(null);
        setTransactionDate(new Date().toISOString().slice(0, 10));
        setTransactionTime("");
        setTransactionType("income");
        setTransactionDesc("");
        setTransactionAmount("");
        setTransactionNote("");
        setTransactionSlipFile(null);
        setTransactionSlipData(null);
        setIsReadingSlip(false);
        setSlipError("");
        setTransactionAttachments([]);
        setTransactionExistingAttachments([]);
        setAttachmentError("");
        setAttachmentUploadProgress(0);
    }
    function openCreateTransactionModal() {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        if (!selectedEventId) return;
        resetTransactionForm();
        setIsTransactionModalOpen(true);
    }
    function openEditTransactionModal(transaction) {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        setEditingTransactionId(transaction.id);
        setTransactionDate(transaction.date);
        setTransactionTime(transaction.time);
        setTransactionType(transaction.type);
        setTransactionDesc(transaction.desc);
        setTransactionAmount(String(transaction.amount));
        setTransactionNote(transaction.note);
        setTransactionSlipFile(null);
        setTransactionSlipData(transaction.slipData);
        setIsReadingSlip(false);
        setSlipError("");
        setTransactionAttachments([]);
        setTransactionExistingAttachments(transaction.attachments);
        setAttachmentError("");
        setAttachmentUploadProgress(0);
        setIsTransactionModalOpen(true);
    }
    function closeTransactionModal() {
        setIsTransactionModalOpen(false);
        resetTransactionForm();
    }
    function getAttachmentSlotCount() {
        return transactionExistingAttachments.length + transactionAttachments.length + (transactionSlipFile ? 1 : 0);
    }
    async function handleSlipFileChange(file) {
        setSlipError("");
        if (!file) return;
        const allowedTypes = new Set([
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
        ]);
        if (!allowedTypes.has(file.type)) {
            setSlipError("สลิปต้องเป็นไฟล์รูปภาพ JPG, PNG, WEBP หรือ GIF");
            return;
        }
        if (file.size > 4 * 1024 * 1024) {
            setSlipError("ไฟล์สลิปมีขนาดเกิน 4 MB");
            return;
        }
        if (getAttachmentSlotCount() >= 5 && !transactionSlipFile) {
            setSlipError("แนบไฟล์ได้สูงสุด 5 ไฟล์ต่อรายการ");
            return;
        }
        setIsReadingSlip(true);
        setSlipError("");
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("accountName", bankAccountName.trim());
            const accountDigits = bankAccountNumber.replace(/\D/g, "");
            formData.append("accountNumberLast4", accountDigits.slice(-4));
            const response = await fetch("/api/ocr-slip", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.error || "อ่านข้อมูลจากสลิปไม่สำเร็จ");
            }
            const parsed = data?.slip;
            setTransactionSlipFile(file);
            setTransactionSlipData(parsed);
            if (parsed?.transactionType === "income" || parsed?.transactionType === "expense") {
                setTransactionType(parsed.transactionType);
            }
            if (parsed?.transferDate) {
                setTransactionDate(parsed.transferDate);
            }
            if (parsed?.transferTime) {
                setTransactionTime(parsed.transferTime);
            }
            if (typeof parsed?.amount === "number" && Number.isFinite(parsed.amount)) {
                setTransactionAmount(String(parsed.amount));
            }
            const payer = parsed?.payerName?.trim() || "";
            const payee = parsed?.payeeName?.trim() || "";
            if (payer || payee) {
                setTransactionDesc([
                    payer,
                    payee
                ].filter(Boolean).join(" → ") || transactionDesc);
            }
            const ownName = bankAccountName.trim().toLowerCase();
            const ownAccount = bankAccountNumber.replace(/\D/g, "");
            const payerAccount = (parsed?.payerAccount ?? "").replace(/\D/g, "");
            const payeeAccount = (parsed?.payeeAccount ?? "").replace(/\D/g, "");
            const payerMatchesOwn = !!ownName && payer.toLowerCase().includes(ownName) || !!ownAccount && payerAccount.endsWith(ownAccount);
            const payeeMatchesOwn = !!ownName && payee.toLowerCase().includes(ownName) || !!ownAccount && payeeAccount.endsWith(ownAccount);
            if (payeeMatchesOwn && !payerMatchesOwn) {
                setTransactionType("income");
            } else if (payerMatchesOwn && !payeeMatchesOwn) {
                setTransactionType("expense");
            }
        } catch (error) {
            console.error("อ่านสลิปไม่สำเร็จ:", error);
            setTransactionSlipFile(null);
            setTransactionSlipData(null);
            setSlipError(error instanceof Error ? error.message : "อ่านข้อมูลจากสลิปไม่สำเร็จ");
        } finally{
            setIsReadingSlip(false);
        }
    }
    function handleTransactionDocumentChange(files) {
        setAttachmentError("");
        if (!files) return;
        const selected = Array.from(files);
        const allowedTypes = new Set([
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf"
        ]);
        const invalidType = selected.find((file)=>!allowedTypes.has(file.type));
        if (invalidType) {
            setAttachmentError(`ไฟล์ "${invalidType.name}" ไม่รองรับ รองรับรูปภาพ JPG, PNG, WEBP, GIF และ PDF`);
            return;
        }
        const tooLarge = selected.find((file)=>file.size > 4 * 1024 * 1024);
        if (tooLarge) {
            setAttachmentError(`ไฟล์ "${tooLarge.name}" มีขนาดเกิน 4 MB`);
            return;
        }
        const availableSlots = 5 - getAttachmentSlotCount();
        if (selected.length > availableSlots) {
            setAttachmentError(`แนบไฟล์ได้สูงสุด 5 ไฟล์ต่อรายการ (ตอนนี้เหลือ ${availableSlots} ช่อง)`);
            return;
        }
        setTransactionAttachments((current)=>[
                ...current,
                ...selected
            ]);
    }
    function removeTransactionSlip() {
        setTransactionSlipFile(null);
        setTransactionSlipData(null);
        setSlipError("");
    }
    function removeNewTransactionAttachment(index) {
        setTransactionAttachments((current)=>current.filter((_, itemIndex)=>itemIndex !== index));
        setAttachmentError("");
    }
    async function uploadTransactionAttachment(file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/google/upload", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("ยังไม่ได้เชื่อมต่อ Google Drive กรุณาเชื่อม Google Drive ก่อนอัปโหลดไฟล์");
            }
            throw new Error(data?.error || "อัปโหลดไฟล์ไม่สำเร็จ");
        }
        return data.file;
    }
    async function saveTransaction() {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        if (!selectedEventId) {
            alert("กรุณาเลือก Event ก่อนเพิ่มรายการ");
            return;
        }
        const cleanDesc = transactionDesc.trim();
        const amount = Number(transactionAmount);
        if (!transactionDate) {
            alert("กรุณาเลือกวันที่");
            return;
        }
        if (!cleanDesc) {
            alert("กรุณาใส่รายละเอียดรายการ");
            return;
        }
        if (!Number.isFinite(amount) || amount <= 0) {
            alert("กรุณาใส่จำนวนเงินที่มากกว่า 0");
            return;
        }
        if (attachmentError) {
            alert(attachmentError);
            return;
        }
        if (getAttachmentSlotCount() > 5) {
            alert("แนบไฟล์ได้สูงสุด 5 ไฟล์ต่อรายการ");
            return;
        }
        let finalAttachments = [
            ...transactionExistingAttachments
        ];
        const filesToUpload = [];
        if (transactionSlipFile) {
            filesToUpload.push({
                file: transactionSlipFile,
                category: "slip"
            });
        }
        for (const file of transactionAttachments){
            filesToUpload.push({
                file,
                category: "document"
            });
        }
        if (filesToUpload.length > 0) {
            setIsUploadingAttachment(true);
            setAttachmentUploadProgress(0);
            try {
                for(let index = 0; index < filesToUpload.length; index += 1){
                    const { file, category } = filesToUpload[index];
                    const uploadedFile = await uploadTransactionAttachment(file);
                    finalAttachments.push({
                        id: uploadedFile.id,
                        name: uploadedFile.name,
                        mimeType: uploadedFile.mimeType,
                        webViewLink: uploadedFile.webViewLink ?? `https://drive.google.com/file/d/${uploadedFile.id}/view`,
                        webContentLink: uploadedFile.webContentLink ?? null,
                        category
                    });
                    setAttachmentUploadProgress(index + 1);
                }
            } catch (error) {
                console.error("อัปโหลดไฟล์แนบไม่สำเร็จ:", error);
                alert(error instanceof Error ? error.message : "อัปโหลดไฟล์แนบไม่สำเร็จ");
                return;
            } finally{
                setIsUploadingAttachment(false);
            }
        }
        const firstAttachment = finalAttachments[0];
        const attachmentPayload = {
            attachments: finalAttachments,
            slip_data: transactionSlipData,
            // เก็บค่าเดิมไว้ด้วยเพื่อ backward compatibility
            attachment_url: firstAttachment?.webViewLink || null,
            attachment_name: firstAttachment?.name || null
        };
        if (editingTransactionId) {
            const { data, error } = await supabase.from("transactions").update({
                date: transactionDate,
                time: transactionTime || null,
                type: transactionType,
                description: cleanDesc,
                amount,
                note: transactionNote.trim() || null,
                ...attachmentPayload
            }).eq("id", editingTransactionId).eq("event_id", selectedEventId).select("id, event_id, date, time, type, description, amount, note, attachments, slip_data, attachment_url, attachment_name, created_at").single();
            if (error || !data) {
                console.error("แก้ไขรายการไม่สำเร็จ:", error);
                alert(`แก้ไขรายการไม่สำเร็จ\n${error?.message ?? "ไม่พบรายการ"}`);
                return;
            }
            const updatedTransaction = mapTransaction(data);
            setTransactions((current)=>current.map((transaction)=>transaction.id === editingTransactionId ? updatedTransaction : transaction));
        } else {
            const { data, error } = await supabase.from("transactions").insert({
                event_id: selectedEventId,
                date: transactionDate,
                time: transactionTime || null,
                type: transactionType,
                description: cleanDesc,
                amount,
                note: transactionNote.trim() || null,
                ...attachmentPayload
            }).select("id, event_id, date, time, type, description, amount, note, attachments, slip_data, attachment_url, attachment_name, created_at").single();
            if (error || !data) {
                console.error("เพิ่มรายการไม่สำเร็จ:", error);
                alert(`เพิ่มรายการไม่สำเร็จ\n${error?.message ?? "ไม่พบรายการที่สร้าง"}`);
                return;
            }
            setTransactions((current)=>[
                    mapTransaction(data),
                    ...current
                ]);
        }
        setTransactionSlipFile(null);
        setTransactionSlipData(null);
        setSlipError("");
        setTransactionAttachments([]);
        setTransactionExistingAttachments(finalAttachments);
        setAttachmentError("");
        setAttachmentUploadProgress(0);
        closeTransactionModal();
    }
    async function deleteTransaction(id) {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        const transaction = transactions.find((item)=>item.id === id);
        if (!transaction) return;
        const confirmed = window.confirm(`ลบรายการ "${transaction.desc}" ใช่หรือไม่?\n\nการดำเนินการนี้ไม่สามารถย้อนกลับได้`);
        if (!confirmed) return;
        const { error } = await supabase.from("transactions").delete().eq("id", id);
        if (error) {
            console.error("ลบรายการไม่สำเร็จ:", error);
            alert(`ลบรายการไม่สำเร็จ\n${error.message}`);
            return;
        }
        setTransactions((current)=>current.filter((item)=>item.id !== id));
    }
    function showToast(message) {
        setToastMessage(message);
        window.setTimeout(()=>setToastMessage(""), 2200);
    }
    function saveQrImage() {
        const imageUrl = qrUrl ? getQrImageUrl(qrUrl) : "";
        if (!imageUrl) {
            showToast("ยังไม่มี QR Code ให้บันทึก");
            return;
        }
        const driveFileId = getDriveFileId(qrUrl);
        if (driveFileId) {
            // ใช้ route ของเว็บเราเองเพื่อให้ LINE/Android WebView
            // ได้รับไฟล์พร้อม Content-Disposition: attachment โดยตรง
            const downloadUrl = `/api/qr-download?fileId=${encodeURIComponent(driveFileId)}`;
            window.location.assign(downloadUrl);
            return;
        }
        // กรณี QR ไม่ได้มาจาก Google Drive ให้ใช้วิธีดาวน์โหลดปกติ
        void (async ()=>{
            try {
                const response = await fetch(imageUrl, {
                    mode: "cors"
                });
                if (!response.ok) {
                    throw new Error("ไม่สามารถดาวน์โหลด QR Code ได้");
                }
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = "oombam-blossom-fc-qr.png";
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.setTimeout(()=>URL.revokeObjectURL(blobUrl), 1000);
                showToast("บันทึก QR Code แล้ว");
            } catch (error) {
                console.error("บันทึก QR ไม่สำเร็จ:", error);
                window.location.assign(imageUrl);
            }
        })();
    }
    async function copyBankAccount() {
        const accountNumber = bankAccountNumber.trim();
        if (!accountNumber) {
            showToast("ยังไม่ได้ตั้งค่าหมายเลขบัญชี");
            return;
        }
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(accountNumber);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = accountNumber;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                textarea.remove();
            }
            showToast("คัดลอกหมายเลขบัญชีแล้ว");
        } catch (error) {
            console.error("คัดลอกหมายเลขบัญชีไม่สำเร็จ:", error);
            showToast(`หมายเลขบัญชี: ${accountNumber}`);
        }
    }
    function openQrModal() {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        setQrInput(qrUrl);
        setIsQrModalOpen(true);
    }
    function closeQrModal() {
        setIsQrModalOpen(false);
        setQrInput("");
    }
    async function saveQr() {
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        const cleanQrUrl = qrInput.trim();
        const { error } = await supabase.from("settings").upsert({
            key: "qr_url",
            value: cleanQrUrl || null,
            updated_at: new Date().toISOString()
        }, {
            onConflict: "key"
        });
        if (error) {
            console.error("บันทึก QR ไม่สำเร็จ:", error);
            alert(`บันทึก QR ไม่สำเร็จ\n${error.message}`);
            return;
        }
        setQrUrl(cleanQrUrl);
        closeQrModal();
    }
    if (!isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            style: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-2)"
            },
            children: "กำลังโหลดข้อมูล..."
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 1367,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "18a663e8eab44d6a",
                children: ".bg-orbs{display:none!important}.navbar{-webkit-backdrop-filter:blur(18px)saturate(140%);background:#050a1894!important;border-bottom:1px solid #ffffff1f!important}.donate-card,.event-media-col,.tx-card,.stat-card{-webkit-backdrop-filter:blur(18px)saturate(135%);box-shadow:0 18px 55px #00000038,inset 0 1px #ffffff0d;background:#0a122494!important;border:1px solid #ffffff1f!important}.detail-hero{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important}.donate-card{background:#0a12243d!important}.stat-card:hover,.tx-card:hover{background:#0f1930ad!important;border-color:#ffffff2e!important}.table-wrap{overflow:hidden;box-shadow:none!important;background:0 0!important;border:none!important;border-radius:20px!important}.table-wrap table{border-radius:20px;background:#0a122494!important}.table-wrap th{background:#ffffff0e!important}.table-wrap tbody tr{background:#ffffff05!important}.table-wrap tbody tr:hover{background:#ffffff12!important}.form-control,select.form-control,input.form-control,textarea.form-control{-webkit-backdrop-filter:blur(10px);background:#050a1885!important;border-color:#ffffff24!important}.chip{-webkit-backdrop-filter:blur(8px);background:#ffffff12!important;border-color:#ffffff1a!important}.modal{-webkit-backdrop-filter:blur(24px)saturate(140%);box-shadow:0 28px 80px #00000073;background:#080f1ed1!important;border:1px solid #ffffff24!important}@media (width<=700px){.donate-card,.event-media-col,.tx-card,.stat-card{-webkit-backdrop-filter:blur(14px)saturate(130%);background:#0a1224a8!important}.detail-hero{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important}.donate-card{background:#0a12246b!important}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-18a663e8eab44d6a" + " " + "bg-orbs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-18a663e8eab44d6a" + " " + "orb orb-1"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1499,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-18a663e8eab44d6a" + " " + "orb orb-2"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1500,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-18a663e8eab44d6a" + " " + "orb orb-3"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1501,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 1498,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "jsx-18a663e8eab44d6a" + " " + "navbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>router.push("/"),
                        className: "jsx-18a663e8eab44d6a" + " " + "nav-brand",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "26",
                                height: "26",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                "aria-hidden": "true",
                                className: "jsx-18a663e8eab44d6a",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                                    stroke: "#60a5fa",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: "jsx-18a663e8eab44d6a"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1517,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1510,
                                columnNumber: 11
                            }, this),
                            "OomBam Blossom FC"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1505,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-18a663e8eab44d6a" + " " + "nav-right",
                        children: isAdmin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "admin-badge",
                                    children: "👤 Admin"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1531,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void doLogout(),
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn-nav btn-logout",
                                    children: "ออกจากระบบ"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1533,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1530,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: openLoginModal,
                            className: "jsx-18a663e8eab44d6a" + " " + "btn-nav btn-login",
                            children: "🔐 Admin Login"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1542,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1528,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 1504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "app",
                className: "jsx-18a663e8eab44d6a",
                children: selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "jsx-18a663e8eab44d6a" + " " + "view active",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "detail-hero section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>router.push("/"),
                                    className: "jsx-18a663e8eab44d6a" + " " + "back-btn",
                                    children: "← กลับหน้าหลัก"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1557,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-18a663e8eab44d6a",
                                    children: selectedEvent.name
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1565,
                                    columnNumber: 15
                                }, this),
                                selectedEvent.desc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--text-2)",
                                        marginTop: "8px"
                                    },
                                    className: "jsx-18a663e8eab44d6a",
                                    children: selectedEvent.desc
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1568,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stats",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "detail-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-label",
                                                    children: "เงินเข้า"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1580,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "var(--income)"
                                                    },
                                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-val",
                                                    children: [
                                                        "฿",
                                                        formatMoney(selectedEventStats.income)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1581,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1579,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "var(--border)"
                                            },
                                            className: "jsx-18a663e8eab44d6a",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1589,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "detail-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-label",
                                                    children: "เงินออก"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1592,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "var(--expense)"
                                                    },
                                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-val",
                                                    children: [
                                                        "฿",
                                                        formatMoney(selectedEventStats.expense)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1593,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1591,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "var(--border)"
                                            },
                                            className: "jsx-18a663e8eab44d6a",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1601,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "detail-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-label",
                                                    children: "ยอดสุทธิ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1604,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: selectedEventStats.balance >= 0 ? "var(--income)" : "var(--expense)"
                                                    },
                                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-val",
                                                    children: [
                                                        selectedEventStats.balance < 0 ? "-" : "",
                                                        "฿",
                                                        formatMoney(Math.abs(selectedEventStats.balance))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1605,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1603,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "var(--border)"
                                            },
                                            className: "jsx-18a663e8eab44d6a",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1619,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "detail-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-label",
                                                    children: "จำนวนรายการ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1622,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "var(--accent)"
                                                    },
                                                    className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-val",
                                                    children: selectedEventStats.count
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1623,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1621,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1578,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1556,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "jsx-18a663e8eab44d6a" + " " + "section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "section-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "section-title",
                                            children: "รายการทั้งหมด"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1635,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "8px",
                                                flexWrap: "wrap"
                                            },
                                            className: "jsx-18a663e8eab44d6a",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: transactionFilter,
                                                    onChange: (event)=>setTransactionFilter(event.target.value),
                                                    style: {
                                                        width: "auto",
                                                        padding: "8px 14px",
                                                        fontSize: ".85rem"
                                                    },
                                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "ทุกประเภท"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1658,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "income",
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "เงินเข้า"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1659,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "expense",
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "เงินออก"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1660,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1644,
                                                    columnNumber: 19
                                                }, this),
                                                isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: openCreateTransactionModal,
                                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-success",
                                                    children: "➕ เพิ่มรายการ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1664,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1637,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1634,
                                    columnNumber: 15
                                }, this),
                                filteredTransactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "empty-state",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "empty-icon",
                                            children: "🧾"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1677,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-18a663e8eab44d6a",
                                            children: [
                                                "ยังไม่มีรายการ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                    className: "jsx-18a663e8eab44d6a"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1680,
                                                    columnNumber: 21
                                                }, this),
                                                transactionFilter ? "ไม่พบรายการในประเภทนี้" : "รายการเงินเข้าและเงินออกจะแสดงที่นี่"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1678,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1676,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "tx-list",
                                    children: filteredTransactions.map((transaction)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "jsx-18a663e8eab44d6a" + " " + `tx-card tx-${transaction.type}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "tx-top",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "tx-info",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "tx-desc",
                                                                    children: transaction.desc
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1695,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "tx-date",
                                                                    children: [
                                                                        formatDate(transaction.date),
                                                                        transaction.time ? ` • ${transaction.time.slice(0, 5)}` : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1696,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1694,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "tx-amount",
                                                            children: [
                                                                transaction.type === "income" ? "+" : "-",
                                                                "฿",
                                                                formatMoney(transaction.amount)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1702,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1693,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "tx-chips",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + `chip ${transaction.type === "income" ? "chip-income" : "chip-expense"}`,
                                                            children: transaction.type === "income" ? "💰 เงินเข้า" : "💸 เงินออก"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1709,
                                                            columnNumber: 25
                                                        }, this),
                                                        transaction.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "chip chip-file",
                                                            children: [
                                                                "📝 ",
                                                                transaction.note
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1721,
                                                            columnNumber: 27
                                                        }, this),
                                                        transaction.attachments.map((attachment)=>isImageAttachment(attachment) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setPreviewAttachment(attachment),
                                                                title: "ดูภาพตัวอย่าง",
                                                                className: "jsx-18a663e8eab44d6a" + " " + "chip chip-file transaction-attachment-chip",
                                                                children: [
                                                                    "🖼️ ",
                                                                    attachment.name
                                                                ]
                                                            }, attachment.id, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1728,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: getAttachmentDownloadUrl(attachment),
                                                                download: true,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                title: "ดาวน์โหลดเอกสาร",
                                                                className: "jsx-18a663e8eab44d6a" + " " + "chip chip-file transaction-attachment-chip",
                                                                children: [
                                                                    "📄 ",
                                                                    attachment.name
                                                                ]
                                                            }, attachment.id, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1738,
                                                                columnNumber: 29
                                                            }, this)),
                                                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>openEditTransactionModal(transaction),
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "chip chip-file",
                                                                    children: "✏️ แก้ไข"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1754,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>void deleteTransaction(transaction.id),
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "chip chip-expense",
                                                                    children: "🗑️ ลบ"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1764,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1753,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1708,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, transaction.id, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1689,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1687,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1633,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "jsx-18a663e8eab44d6a" + " " + "section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "section-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "section-title",
                                            children: "รูปภาพและตารางงาน"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1784,
                                            columnNumber: 17
                                        }, this),
                                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>openEditEventModal(selectedEvent),
                                            className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                            children: "⚙️ ตั้งค่าลิงก์สื่อ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1787,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1783,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "event-media-grid",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "event-media-col event-media-gallery",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "event-media-heading",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "event-media-title",
                                                                children: "📸 รูปภาพจากงาน"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1801,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1800,
                                                            columnNumber: 21
                                                        }, this),
                                                        selectedEventImages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-count",
                                                            children: [
                                                                selectedImageIndex + 1,
                                                                " / ",
                                                                selectedEventImages.length
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1805,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1799,
                                                    columnNumber: 19
                                                }, this),
                                                isLoadingEventImages ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty slideshow-loading",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-spinner"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1813,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "กำลังโหลดรูปจาก Google Drive..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1814,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1812,
                                                    columnNumber: 21
                                                }, this) : eventImagesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty-icon",
                                                            children: "⚠️"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1818,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: eventImagesError
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1819,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1817,
                                                    columnNumber: 21
                                                }, this) : selectedEventImages.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "slideshow-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-main",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "slideshow-image-backdrop"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1824,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: selectedEventImages[selectedImageIndex].imageUrl,
                                                                    alt: selectedEventImages[selectedImageIndex]?.name ?? `Event image ${selectedImageIndex + 1}`,
                                                                    onError: (event)=>{
                                                                        event.currentTarget.style.opacity = "0.35";
                                                                    },
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "slideshow-image"
                                                                }, selectedEventImages[selectedImageIndex].id, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1826,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "slideshow-top-gradient"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1839,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "slideshow-bottom-gradient"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1840,
                                                                    columnNumber: 25
                                                                }, this),
                                                                selectedEventImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            "aria-label": "รูปก่อนหน้า",
                                                                            onClick: ()=>setSelectedImageIndex((current)=>current === 0 ? selectedEventImages.length - 1 : current - 1),
                                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-arrow prev",
                                                                            children: "‹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 1846,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            "aria-label": "รูปถัดไป",
                                                                            onClick: ()=>setSelectedImageIndex((current)=>current === selectedEventImages.length - 1 ? 0 : current + 1),
                                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-arrow next",
                                                                            children: "›"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 1861,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1845,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1823,
                                                            columnNumber: 23
                                                        }, this),
                                                        selectedEventImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-thumbs-wrap",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "slideshow-thumbs",
                                                                children: selectedEventImages.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>setSelectedImageIndex(index),
                                                                        "aria-label": `เลือกรูปที่ ${index + 1}`,
                                                                        "aria-current": index === selectedImageIndex ? "true" : undefined,
                                                                        className: "jsx-18a663e8eab44d6a" + " " + `slideshow-thumb-btn ${index === selectedImageIndex ? "active" : ""}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                src: image.imageUrl,
                                                                                alt: `Thumbnail ${index + 1}`,
                                                                                className: "jsx-18a663e8eab44d6a" + " " + "slideshow-thumb"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1898,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "jsx-18a663e8eab44d6a" + " " + "slideshow-thumb-number",
                                                                                children: index + 1
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1903,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, `${image.id}-${index}`, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1885,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1883,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1880,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1822,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty-icon",
                                                            children: "🖼️"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1914,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "ยังไม่มีรูปภาพในโฟลเดอร์ Google Drive นี้"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1915,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1913,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1798,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "event-media-col event-schedule-card",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "event-media-heading",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "event-media-title",
                                                            children: "📅 ตารางงาน"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1923,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1922,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1921,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setIsSchedulePreviewOpen(true),
                                                    "aria-label": "เปิดตารางงานแบบขยาย",
                                                    style: {
                                                        cursor: "zoom-in"
                                                    },
                                                    className: "jsx-18a663e8eab44d6a" + " " + "schedule-image-frame",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: getScheduleImageUrl(selectedEvent.scheduleUrl),
                                                        alt: "Schedule",
                                                        className: "jsx-18a663e8eab44d6a" + " " + "event-media-img"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1934,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1927,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1920,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1797,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1782,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 1555,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "jsx-18a663e8eab44d6a" + " " + "view active",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                height: "40px"
                            },
                            className: "jsx-18a663e8eab44d6a"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1947,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "jsx-18a663e8eab44d6a" + " " + "section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "stats-grid",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "stat-card stat-income",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-icon stat-icon-image",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/icons/income.png",
                                                        alt: "เงินเข้า",
                                                        className: "jsx-18a663e8eab44d6a"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1952,
                                                        columnNumber: 62
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1952,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-label",
                                                    children: "รวมเงินเข้าทั้งหมด"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1953,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-value",
                                                    children: [
                                                        "฿",
                                                        formatMoney(globalStats.income)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1954,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1951,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "stat-card stat-expense",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-icon stat-icon-image",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/icons/expense.png",
                                                        alt: "เงินออก",
                                                        className: "jsx-18a663e8eab44d6a"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1960,
                                                        columnNumber: 62
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1960,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-label",
                                                    children: "รวมเงินออกทั้งหมด"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1961,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-value",
                                                    children: [
                                                        "฿",
                                                        formatMoney(globalStats.expense)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1962,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1959,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + `stat-card stat-balance${globalStats.balance < 0 ? " negative" : ""}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-icon stat-icon-image",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/icons/balance.png",
                                                        alt: "ยอดคงเหลือสุทธิ",
                                                        className: "jsx-18a663e8eab44d6a"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1971,
                                                        columnNumber: 62
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1971,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-label",
                                                    children: "ยอดคงเหลือสุทธิ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1972,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "stat-value",
                                                    children: [
                                                        globalStats.balance < 0 ? "-" : "",
                                                        "฿",
                                                        formatMoney(Math.abs(globalStats.balance))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1973,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1967,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1950,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "section-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "section-title",
                                            children: "สรุป Event ทั้งหมด"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1981,
                                            columnNumber: 17
                                        }, this),
                                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: openCreateEventModal,
                                            className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                            children: "➕ เพิ่ม Event"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1984,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1980,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "table-wrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "jsx-18a663e8eab44d6a",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "jsx-18a663e8eab44d6a",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "jsx-18a663e8eab44d6a",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "ชื่อ Event"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1998,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "รายการ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1999,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "เงินเข้า (฿)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2000,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "เงินออก (฿)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2001,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "ยอดสุทธิ (฿)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2002,
                                                            columnNumber: 23
                                                        }, this),
                                                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: "จัดการ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2003,
                                                            columnNumber: 35
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1997,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1996,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "jsx-18a663e8eab44d6a",
                                                children: events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "jsx-18a663e8eab44d6a",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: isAdmin ? 6 : 5,
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "empty-state",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "empty-icon",
                                                                    children: "📂"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2012,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-18a663e8eab44d6a",
                                                                    children: [
                                                                        "ยังไม่มี Event",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                            className: "jsx-18a663e8eab44d6a"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2015,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isAdmin ? 'คลิก "เพิ่ม Event" เพื่อเริ่มต้น' : "รอข้อมูลจาก Admin"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2013,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2011,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2010,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2009,
                                                    columnNumber: 23
                                                }, this) : events.map((event)=>{
                                                    const eventTransactions = transactions.filter((transaction)=>transaction.eventId === event.id);
                                                    const income = eventTransactions.filter((transaction)=>transaction.type === "income").reduce((sum, transaction)=>sum + Number(transaction.amount), 0);
                                                    const expense = eventTransactions.filter((transaction)=>transaction.type === "expense").reduce((sum, transaction)=>sum + Number(transaction.amount), 0);
                                                    const balance = income - expense;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        onClick: ()=>openEventDetail(event.id),
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "td-event-name",
                                                                children: [
                                                                    event.name,
                                                                    event.eventDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: ".72rem",
                                                                            color: "var(--text-3)",
                                                                            fontWeight: 400,
                                                                            marginTop: "3px"
                                                                        },
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: [
                                                                            "📅 ",
                                                                            formatDate(event.eventDate)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2060,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    event.desc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: ".76rem",
                                                                            color: "var(--text-3)",
                                                                            marginTop: "2px"
                                                                        },
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: event.desc
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2073,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2056,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "jsx-18a663e8eab44d6a",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "chip-count",
                                                                    children: [
                                                                        eventTransactions.length,
                                                                        " รายการ"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2086,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2085,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "td-income",
                                                                children: [
                                                                    "฿",
                                                                    formatMoney(income)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2091,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "td-expense",
                                                                children: [
                                                                    "฿",
                                                                    formatMoney(expense)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2095,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + `td-balance ${balance >= 0 ? "pos" : "neg"}`,
                                                                children: [
                                                                    balance < 0 ? "-" : "",
                                                                    "฿",
                                                                    formatMoney(Math.abs(balance))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2099,
                                                                columnNumber: 29
                                                            }, this),
                                                            isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                onClick: (eventObject)=>eventObject.stopPropagation(),
                                                                className: "jsx-18a663e8eab44d6a",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-18a663e8eab44d6a" + " " + "td-actions",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>openEditEventModal(event),
                                                                            className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                                                            children: "✏️ แก้ไข"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2114,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>void deleteEvent(event.id),
                                                                            className: "jsx-18a663e8eab44d6a" + " " + "btn btn-danger btn-sm",
                                                                            children: "🗑️"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2124,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2113,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2108,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, event.id, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2052,
                                                        columnNumber: 27
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2007,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1995,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1994,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1949,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "jsx-18a663e8eab44d6a" + " " + "donate-section",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-18a663e8eab44d6a" + " " + "donate-card",
                                children: [
                                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: openQrModal,
                                        className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm donate-admin-btn show",
                                        children: "⚙️ ตั้งค่า QR"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2148,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-qr-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "donate-qr-frame",
                                                children: qrUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: getQrImageUrl(qrUrl),
                                                    alt: "QR Code โอนเงิน",
                                                    className: "jsx-18a663e8eab44d6a"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2160,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "donate-qr-placeholder",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a" + " " + "qr-icon",
                                                            children: "📱"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2163,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: [
                                                                "QR Code",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                    className: "jsx-18a663e8eab44d6a"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2166,
                                                                    columnNumber: 27
                                                                }, this),
                                                                "ยังไม่ได้ตั้งค่า"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2164,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2162,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2158,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "donate-qr-badge",
                                                children: "📲 Scan to Pay"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2173,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-text",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "donate-eyebrow",
                                                children: "ร่วมสนับสนุน"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2177,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "donate-title",
                                                children: [
                                                    "ร่วมเป็นส่วนหนึ่งของ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                        className: "jsx-18a663e8eab44d6a"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2181,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: "OomBam Blossom FC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2182,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2179,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "donate-desc",
                                                children: "ทุกการสนับสนุนของคุณจะช่วยให้โปรเจคนี้เดินหน้าต่อไปได้ สแกน QR Code หรือโอนเงินผ่านช่องทางด้านล่างได้เลย ขอบคุณทุกแรงใจที่มอบให้ 🌸"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2185,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    margin: "18px 0 20px",
                                                    padding: "14px 16px",
                                                    borderRadius: "14px",
                                                    background: "rgba(255, 255, 255, 0.04)",
                                                    border: "1px solid var(--border)"
                                                },
                                                className: "jsx-18a663e8eab44d6a",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: ".78rem",
                                                            color: "var(--text-3)",
                                                            marginBottom: "8px"
                                                        },
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: "ข้อมูลสำหรับโอนเงิน"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2200,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "grid",
                                                            gap: "5px",
                                                            fontSize: ".88rem"
                                                        },
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            color: "var(--text-3)"
                                                                        },
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "ธนาคาร: "
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2218,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: bankName || "—"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2219,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2217,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            color: "var(--text-3)"
                                                                        },
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "เลขที่บัญชี: "
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2223,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: bankAccountNumber || "—"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2224,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2222,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            color: "var(--text-3)"
                                                                        },
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "ชื่อบัญชี: "
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2228,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: bankAccountName || "—"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2229,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2227,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2210,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2191,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "donate-methods",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>void saveQrImage(),
                                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-method donate-method-button donate-method-save",
                                                        children: "💾 Save QR"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2235,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>void copyBankAccount(),
                                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-method donate-method-button donate-method-copy",
                                                        children: "📋 คัดลอกหมายเลขบัญชี"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2243,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2234,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2176,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 2146,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2145,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 1946,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 1553,
                columnNumber: 7
            }, this),
            isEventModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (event)=>{
                    if (event.target === event.currentTarget) {
                        closeEventModal();
                    }
                },
                className: "jsx-18a663e8eab44d6a" + " " + "modal-overlay open",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-18a663e8eab44d6a" + " " + "modal",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "modal-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "modal-title",
                                    children: editingEventId ? "✏️ แก้ไข Event" : "➕ สร้าง Event ใหม่"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2269,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closeEventModal,
                                    className: "jsx-18a663e8eab44d6a" + " " + "modal-close",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2273,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2268,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "ชื่อ Event *"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2283,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "เช่น งานปีใหม่ 2025, โปรเจกต์ A...",
                                    value: eventName,
                                    onChange: (event)=>setEventName(event.target.value),
                                    autoFocus: true,
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2284,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2282,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "วันที่ Event *"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2295,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    value: eventDate,
                                    onChange: (event)=>setEventDate(event.target.value),
                                    required: true,
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2296,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "drive-hint",
                                    children: "📅 วันที่จัด Event จริง"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2303,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2294,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "รายละเอียด (ไม่บังคับ)"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2309,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    rows: 3,
                                    placeholder: "รายละเอียดเพิ่มเติม...",
                                    value: eventDesc,
                                    onChange: (event)=>setEventDesc(event.target.value),
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2312,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2308,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "🖼️ ลิงก์โฟลเดอร์รูปภาพ Google Drive"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2322,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "url",
                                    placeholder: "https://drive.google.com/drive/folders/...",
                                    value: imageFolderUrl,
                                    onChange: (event)=>setImageFolderUrl(event.target.value),
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2325,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "drive-hint",
                                    children: [
                                        "📌 ใส่ลิงก์โฟลเดอร์เพียง 1 ลิงก์ ระบบจะดึงรูปทั้งหมดในโฟลเดอร์",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                            className: "jsx-18a663e8eab44d6a"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2334,
                                            columnNumber: 17
                                        }, this),
                                        "🔓 ต้องตั้งโฟลเดอร์เป็น “ทุกคนที่มีลิงก์ → ผู้ดู”"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2332,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2321,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "ลิงก์ภาพตารางงาน (Google Drive - ไม่บังคับ)"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2340,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "url",
                                    placeholder: "https://drive.google.com/file/d/...",
                                    value: scheduleUrl,
                                    onChange: (event)=>setScheduleUrl(event.target.value),
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2343,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: "8px"
                                    },
                                    className: "jsx-18a663e8eab44d6a" + " " + "drive-hint",
                                    children: "📎 ใส่ลิงก์ภาพตารางงาน หรือเว้นว่างเพื่อใช้ภาพเริ่มต้น"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2350,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2339,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closeEventModal,
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost",
                                    children: "ยกเลิก"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2359,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void saveEvent(),
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                    children: "💾 บันทึก"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2367,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2358,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 2267,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 2259,
                columnNumber: 9
            }, this),
            isTransactionModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (event)=>{
                    if (event.target === event.currentTarget) {
                        closeTransactionModal();
                    }
                },
                className: "jsx-18a663e8eab44d6a" + " " + "modal-overlay open",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-18a663e8eab44d6a" + " " + "modal",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "modal-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "modal-title",
                                    children: editingTransactionId ? "✏️ แก้ไขรายการ" : "➕ เพิ่มรายการ"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2390,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closeTransactionModal,
                                    className: "jsx-18a663e8eab44d6a" + " " + "modal-close",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2396,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2389,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                            children: "วันที่ *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2407,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: transactionDate,
                                            onChange: (event)=>setTransactionDate(event.target.value),
                                            className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2408,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2406,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                            children: "เวลา"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2419,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "time",
                                            step: "1",
                                            value: transactionTime,
                                            onChange: (event)=>setTransactionTime(event.target.value),
                                            className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2420,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2418,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                            children: "ประเภท *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2432,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: transactionType,
                                            onChange: (event)=>setTransactionType(event.target.value),
                                            className: "jsx-18a663e8eab44d6a" + " " + "form-control",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "income",
                                                    className: "jsx-18a663e8eab44d6a",
                                                    children: "เงินเข้า"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2442,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "expense",
                                                    className: "jsx-18a663e8eab44d6a",
                                                    children: "เงินออก"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2443,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2433,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2431,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2405,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "รายละเอียด *"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2449,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "เช่น เงินสนับสนุน, ค่าเดินทาง, ค่าอาหาร...",
                                    value: transactionDesc,
                                    onChange: (event)=>setTransactionDesc(event.target.value),
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2450,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2448,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "จำนวนเงิน (฿) *"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2462,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: "0",
                                    step: "0.01",
                                    placeholder: "0.00",
                                    value: transactionAmount,
                                    onChange: (event)=>setTransactionAmount(event.target.value),
                                    className: "jsx-18a663e8eab44d6a" + " " + `form-control ${transactionType === "income" ? "input-type-income" : "input-type-expense"}`
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2465,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2461,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "หมายเหตุ (ไม่บังคับ)"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2482,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    rows: 3,
                                    placeholder: "รายละเอียดเพิ่มเติม...",
                                    value: transactionNote,
                                    onChange: (event)=>setTransactionNote(event.target.value),
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2485,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2481,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "📎 ไฟล์ประกอบรายการ"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2497,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-grid",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-card transaction-upload-slip",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-icon",
                                                    children: "🧾"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2501,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-title",
                                                    children: "อัปโหลดสลิป"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2502,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-subtitle",
                                                    children: "ระบบจะอ่านธนาคาร ประเภท ผู้โอน ผู้รับ วันที่ เวลา และจำนวนเงิน"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2503,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: "image/jpeg,image/png,image/webp,image/gif",
                                                    onChange: (event)=>{
                                                        void handleSlipFileChange(event.target.files?.[0] ?? null);
                                                        event.currentTarget.value = "";
                                                    },
                                                    disabled: isUploadingAttachment || isReadingSlip || getAttachmentSlotCount() >= 5 && !transactionSlipFile,
                                                    hidden: true,
                                                    className: "jsx-18a663e8eab44d6a"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2506,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2500,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-card transaction-upload-document",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-icon",
                                                    children: "📎"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2523,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-title",
                                                    children: "อัปโหลดเอกสาร"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2524,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-subtitle",
                                                    children: "PDF, JPG, PNG, WEBP, GIF"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2525,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: "image/jpeg,image/png,image/webp,image/gif,application/pdf,.pdf",
                                                    multiple: true,
                                                    onChange: (event)=>{
                                                        handleTransactionDocumentChange(event.target.files);
                                                        event.currentTarget.value = "";
                                                    },
                                                    disabled: isUploadingAttachment || isReadingSlip || getAttachmentSlotCount() >= 5,
                                                    hidden: true,
                                                    className: "jsx-18a663e8eab44d6a"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2528,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2522,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2499,
                                    columnNumber: 15
                                }, this),
                                isReadingSlip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "drive-hint slip-reading-status",
                                    children: "🔎 กำลังอ่านข้อมูลจากสลิป..."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2547,
                                    columnNumber: 17
                                }, this),
                                slipError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "error-msg show",
                                    children: slipError
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2553,
                                    columnNumber: 17
                                }, this),
                                transactionSlipFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-row transaction-slip-file-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-main",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-name",
                                                    children: [
                                                        "🧾 ",
                                                        transactionSlipFile.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2559,
                                                    columnNumber: 21
                                                }, this),
                                                transactionSlipData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-slip-data-grid",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-18a663e8eab44d6a",
                                                                    children: "ธนาคาร:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2566,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " ",
                                                                transactionSlipData.bankName || "ไม่พบข้อมูล"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2565,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-18a663e8eab44d6a",
                                                                    children: "ประเภท:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2570,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " ",
                                                                transactionSlipData.transactionType === "income" ? "เงินเข้า" : transactionSlipData.transactionType === "expense" ? "เงินออก" : "ไม่ระบุ"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2569,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-18a663e8eab44d6a",
                                                                    children: "ผู้โอน:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2578,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " ",
                                                                transactionSlipData.payerName || "ไม่พบข้อมูล"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2577,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-18a663e8eab44d6a",
                                                                    children: "ผู้รับ:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2582,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " ",
                                                                transactionSlipData.payeeName || "ไม่พบข้อมูล"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2581,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-18a663e8eab44d6a",
                                                                    children: "วันที่:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2586,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " ",
                                                                transactionSlipData.transferDate || "ไม่พบข้อมูล"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2585,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-18a663e8eab44d6a",
                                                                    children: "เวลา:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2590,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " ",
                                                                transactionSlipData.transferTime || "ไม่พบข้อมูล"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2589,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-18a663e8eab44d6a",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-18a663e8eab44d6a",
                                                                    children: "จำนวนเงิน:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2594,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " ",
                                                                typeof transactionSlipData.amount === "number" ? `฿${formatMoney(transactionSlipData.amount)}` : "ไม่พบข้อมูล"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2593,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2564,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2558,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: removeTransactionSlip,
                                            disabled: isUploadingAttachment,
                                            className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                            children: "ลบสลิป"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2603,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2557,
                                    columnNumber: 17
                                }, this),
                                transactionAttachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-selected-list",
                                    children: transactionAttachments.map((file, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-name",
                                                    children: [
                                                        "📄 ",
                                                        file.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2621,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>removeNewTransactionAttachment(index),
                                                    disabled: isUploadingAttachment,
                                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                                    children: "ลบ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2625,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, `${file.name}-${file.lastModified}-${index}`, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2617,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2615,
                                    columnNumber: 17
                                }, this),
                                transactionExistingAttachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-existing-list",
                                    children: transactionExistingAttachments.map((attachment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-row transaction-file-existing",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-name",
                                                    children: [
                                                        attachment.category === "slip" ? "🧾" : isImageAttachment(attachment) ? "🖼️" : "📄",
                                                        " ",
                                                        attachment.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2645,
                                                    columnNumber: 23
                                                }, this),
                                                isImageAttachment(attachment) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setPreviewAttachment(attachment),
                                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                                    children: "ดูตัวอย่าง"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2655,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, attachment.id, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2641,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2639,
                                    columnNumber: 17
                                }, this),
                                getAttachmentSlotCount() === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-hint",
                                    children: "แนบได้สูงสุด 5 ไฟล์ต่อรายการ • สลิป 1 ไฟล์ + เอกสารหลายไฟล์ • ไฟล์ละไม่เกิน 4 MB"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2669,
                                    columnNumber: 17
                                }, this),
                                getAttachmentSlotCount() >= 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-hint",
                                    children: "✓ แนบครบ 5 ไฟล์แล้ว"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2675,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2496,
                            columnNumber: 13
                        }, this),
                        isUploadingAttachment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "drive-hint",
                            children: [
                                "⏳ กำลังอัปโหลดไฟล์ ",
                                attachmentUploadProgress + 1,
                                " /",
                                " ",
                                transactionAttachments.length + (transactionSlipFile ? 1 : 0),
                                " ไป Google Drive..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2682,
                            columnNumber: 15
                        }, this),
                        attachmentError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "error-msg show",
                            children: attachmentError
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2692,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closeTransactionModal,
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost",
                                    children: "ยกเลิก"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2695,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void saveTransaction(),
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                    children: "💾 บันทึก"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2703,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2694,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 2388,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 2380,
                columnNumber: 9
            }, this),
            isLoginModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (event)=>{
                    if (event.target === event.currentTarget) {
                        closeLoginModal();
                    }
                },
                className: "jsx-18a663e8eab44d6a" + " " + "modal-overlay open",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-18a663e8eab44d6a" + " " + "modal login-modal",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "login-icon",
                            children: "🔐"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2725,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                justifyContent: "center",
                                marginBottom: "20px"
                            },
                            className: "jsx-18a663e8eab44d6a" + " " + "modal-header",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "1.3rem"
                                },
                                className: "jsx-18a663e8eab44d6a" + " " + "modal-title",
                                children: "Admin Login"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 2734,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2727,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "อีเมล"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2743,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    placeholder: "admin@example.com",
                                    value: loginEmail,
                                    onChange: (event)=>{
                                        setLoginEmail(event.target.value);
                                        setLoginError("");
                                    },
                                    autoFocus: true,
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2744,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2742,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "รหัสผ่าน"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2758,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    placeholder: "ใส่รหัสผ่าน...",
                                    value: loginPassword,
                                    onChange: (event)=>{
                                        setLoginPassword(event.target.value);
                                        setLoginError("");
                                    },
                                    onKeyDown: (event)=>{
                                        if (event.key === "Enter") {
                                            void doLogin();
                                        }
                                    },
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2759,
                                    columnNumber: 15
                                }, this),
                                loginError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "error-msg show",
                                    children: loginError
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2776,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2757,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closeLoginModal,
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost",
                                    children: "ยกเลิก"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2783,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void doLogin(),
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                    children: "🔓 เข้าสู่ระบบ"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2791,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2782,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 2724,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 2716,
                columnNumber: 9
            }, this),
            isSchedulePreviewOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (event)=>{
                    if (event.target === event.currentTarget) {
                        setIsSchedulePreviewOpen(false);
                    }
                },
                className: "jsx-18a663e8eab44d6a" + " " + "slip-viewer-overlay open",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "96vw",
                        maxHeight: "96vh",
                        overflow: "auto",
                        padding: "8px",
                        borderRadius: "16px"
                    },
                    className: "jsx-18a663e8eab44d6a" + " " + "slip-viewer-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setIsSchedulePreviewOpen(false),
                            "aria-label": "ปิดตัวอย่างตารางงาน",
                            className: "jsx-18a663e8eab44d6a" + " " + "slip-close schedule-preview-close",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2822,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: getScheduleImageUrl(selectedEvent?.scheduleUrl ?? ""),
                            alt: "Schedule preview",
                            style: {
                                maxWidth: "92vw",
                                maxHeight: "92vh",
                                width: "auto",
                                height: "auto",
                                cursor: "zoom-out"
                            },
                            onClick: ()=>setIsSchedulePreviewOpen(false),
                            className: "jsx-18a663e8eab44d6a"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2831,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 2812,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 2804,
                columnNumber: 9
            }, this),
            previewAttachment && isImageAttachment(previewAttachment) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (event)=>{
                    if (event.target === event.currentTarget) {
                        setPreviewAttachment(null);
                    }
                },
                className: "jsx-18a663e8eab44d6a" + " " + "slip-viewer-overlay open transaction-image-preview-overlay",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-18a663e8eab44d6a" + " " + "transaction-image-preview",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setPreviewAttachment(null),
                            "aria-label": "ปิดตัวอย่างรูป",
                            className: "jsx-18a663e8eab44d6a" + " " + "slip-close transaction-preview-close",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2857,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: getAttachmentImagePreviewUrl(previewAttachment),
                            alt: previewAttachment.name,
                            className: "jsx-18a663e8eab44d6a"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2866,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "transaction-preview-caption",
                            children: previewAttachment.name
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2871,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 2856,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 2848,
                columnNumber: 9
            }, this),
            isQrModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (event)=>{
                    if (event.target === event.currentTarget) {
                        closeQrModal();
                    }
                },
                className: "jsx-18a663e8eab44d6a" + " " + "modal-overlay open",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-18a663e8eab44d6a" + " " + "modal",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "modal-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "modal-title",
                                    children: "⚙️ ตั้งค่า QR Code"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2889,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closeQrModal,
                                    className: "jsx-18a663e8eab44d6a" + " " + "modal-close",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2893,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2888,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                    children: "ลิงก์ภาพ QR Code"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2903,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "url",
                                    placeholder: "วางลิงก์ Google Drive หรือ https://...",
                                    value: qrInput,
                                    onChange: (event)=>setQrInput(event.target.value),
                                    className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2907,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: "8px"
                                    },
                                    className: "jsx-18a663e8eab44d6a" + " " + "drive-hint",
                                    children: [
                                        "📎 วางลิงก์แชร์ Google Drive ของรูป QR ได้เลย",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                            className: "jsx-18a663e8eab44d6a"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2922,
                                            columnNumber: 17
                                        }, this),
                                        "🔓 ตั้งสิทธิ์ไฟล์เป็น “ทุกคนที่มีลิงก์ → ผู้ดู”",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                            className: "jsx-18a663e8eab44d6a"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2924,
                                            columnNumber: 17
                                        }, this),
                                        "☁️ ระบบจะบันทึกลิงก์ไว้ใน Supabase และแปลงลิงก์ Drive ให้อัตโนมัติ"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2917,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2902,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-18a663e8eab44d6a" + " " + "form-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closeQrModal,
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost",
                                    children: "ยกเลิก"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2930,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: saveQr,
                                    className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                    children: "💾 บันทึก"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2938,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2929,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 2887,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 2879,
                columnNumber: 9
            }, this),
            toastMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "toast-container",
                className: "jsx-18a663e8eab44d6a",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-18a663e8eab44d6a" + " " + "toast toast-success",
                    children: [
                        "✓ ",
                        toastMessage
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 2952,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 2951,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 1382,
        columnNumber: 5
    }, this);
}
_s(Home, "vCYCwl2weIq9CnLw6Q3wt6Ms6tA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://pyicsflwdnyrweqmqkqg.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_sIFY1LRB4-_I1JaY5VnzQg_XkvrqtTJ"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1d94q1g._.js.map