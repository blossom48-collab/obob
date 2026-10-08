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
"use client";
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
function getDriveFolderId(url) {
    const value = url.trim();
    if (!value) return null;
    const match = value.match(/\/folders\/([a-zA-Z0-9_-]+)/i);
    return match?.[1] ?? null;
}
function normalizeDriveFolderUrl(url) {
    const folderId = getDriveFolderId(url);
    if (!folderId) return url.trim();
    return `https://drive.google.com/drive/folders/${folderId}`;
}
function getLatestEventImageCandidates(image) {
    const candidates = [];
    if (image.id) {
        candidates.push(`https://lh3.googleusercontent.com/d/${image.id}=w1600`, `https://drive.google.com/thumbnail?id=${encodeURIComponent(image.id)}&sz=w1600`);
    }
    if (image.imageUrl?.trim()) {
        candidates.push(image.imageUrl.trim());
    }
    return [
        ...new Set(candidates)
    ];
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
    const [isUploadingPublicSlip, setIsUploadingPublicSlip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUploadingLatestEventImage, setIsUploadingLatestEventImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [latestEventPromoImageName, setLatestEventPromoImageName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [bankName, setBankName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [bankAccountNumber, setBankAccountNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [bankAccountName, setBankAccountName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [toastMessage, setToastMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedEventImages, setSelectedEventImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingEventImages, setIsLoadingEventImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [eventImagesError, setEventImagesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [latestEventImage, setLatestEventImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [latestEventImageSrc, setLatestEventImageSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [latestEventImageSrcIndex, setLatestEventImageSrcIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [latestEventImageError, setLatestEventImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
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
                "latest_event_promo_image",
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
            setLatestEventImage(null);
            setLatestEventImageSrc("");
            setLatestEventImageSrcIndex(0);
            setLatestEventPromoImageName("");
            setBankName("");
            setBankAccountNumber("");
            setBankAccountName("");
        } else {
            const settings = (settingRows ?? []).reduce((result, row)=>{
                result[row.key] = row.value ?? "";
                return result;
            }, {});
            const savedLatestPromo = settings.latest_event_promo_image ?? "";
            if (savedLatestPromo) {
                try {
                    const parsedPromo = JSON.parse(savedLatestPromo);
                    if (parsedPromo?.id) {
                        setLatestEventImage(parsedPromo);
                        setLatestEventImageSrc(parsedPromo.imageUrl || `https://lh3.googleusercontent.com/d/${parsedPromo.id}=w1600`);
                        setLatestEventImageSrcIndex(0);
                        setLatestEventPromoImageName(parsedPromo.name ?? "");
                    }
                } catch (error) {
                    console.warn("อ่านข้อมูลรูป Event ล่าสุดจาก Settings ไม่สำเร็จ:", error);
                }
            }
            setBankName(settings.bank_name ?? "");
            setBankAccountNumber(settings.bank_account_number ?? "");
            setBankAccountName(settings.bank_account_name ?? "");
        }
        setIsAdmin(!!sessionData.session);
        setIsReady(true);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const root = document.documentElement;
            const updateDesktopBackgroundMetrics = {
                "Home.useEffect.updateDesktopBackgroundMetrics": ()=>{
                    if (window.innerWidth <= 768) {
                        root.style.removeProperty("--desktop-bg-height");
                        return;
                    }
                    const width = Math.min(1100, Math.max(0, window.innerWidth - 48));
                    const height = width * (4 / 3);
                    root.style.setProperty("--desktop-bg-width", `${width}px`);
                    root.style.setProperty("--desktop-bg-height", `${height}px`);
                }
            }["Home.useEffect.updateDesktopBackgroundMetrics"];
            updateDesktopBackgroundMetrics();
            window.addEventListener("resize", updateDesktopBackgroundMetrics);
            return ({
                "Home.useEffect": ()=>{
                    window.removeEventListener("resize", updateDesktopBackgroundMetrics);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
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
    async function handlePublicSlipUpload(file) {
        if (!file) return;
        const allowedTypes = new Set([
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf"
        ]);
        if (!allowedTypes.has(file.type)) {
            alert("รองรับสลิปเป็น JPG, PNG, WEBP, GIF หรือ PDF เท่านั้น");
            return;
        }
        if (file.size === 0) {
            alert("ไฟล์ว่างเปล่า");
            return;
        }
        if (file.size > 4 * 1024 * 1024) {
            alert("ไฟล์สลิปต้องมีขนาดไม่เกิน 4 MB");
            return;
        }
        setIsUploadingPublicSlip(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("uploadType", "public-slip");
            const response = await fetch("/api/google/upload", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.error || "อัปโหลดสลิปไม่สำเร็จ");
            }
            showToast("อัปโหลดสลิปเรียบร้อยแล้ว ขอบคุณครับ 🌸");
        } catch (error) {
            console.error("อัปโหลดสลิปไม่สำเร็จ:", error);
            alert(error instanceof Error ? error.message : "อัปโหลดสลิปไม่สำเร็จ");
        } finally{
            setIsUploadingPublicSlip(false);
        }
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
    async function saveLatestEventPromoSetting(image) {
        const { error } = await supabase.from("settings").upsert({
            key: "latest_event_promo_image",
            value: JSON.stringify(image),
            updated_at: new Date().toISOString()
        }, {
            onConflict: "key"
        });
        if (error) {
            throw new Error(`บันทึกข้อมูลรูป Event ล่าสุดไม่สำเร็จ: ${error.message}`);
        }
    }
    async function handleLatestEventImageUpload(file) {
        if (!file) return;
        if (!isAdmin) {
            openLoginModal();
            return;
        }
        if (!file.type.startsWith("image/")) {
            alert("ไฟล์ Event ล่าสุดต้องเป็นรูปภาพเท่านั้น");
            return;
        }
        if (file.size > 4 * 1024 * 1024) {
            alert("รูป Event ล่าสุดต้องมีขนาดไม่เกิน 4 MB");
            return;
        }
        setIsUploadingLatestEventImage(true);
        setLatestEventImageError("");
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("uploadType", "event-promo");
            const response = await fetch("/api/google/upload", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("ยังไม่ได้เชื่อมต่อ Google Drive กรุณาเชื่อม Google Drive ก่อนอัปโหลดรูป");
                }
                throw new Error(data?.error || "อัปโหลดรูป Event ล่าสุดไม่สำเร็จ");
            }
            const uploaded = data?.file;
            if (!uploaded?.id) {
                throw new Error("อัปโหลดสำเร็จแต่ไม่พบข้อมูลไฟล์ที่สร้างขึ้น");
            }
            const image = {
                id: String(uploaded.id),
                name: String(uploaded.name ?? file.name),
                mimeType: String(uploaded.mimeType ?? file.type),
                imageUrl: String(uploaded.imageUrl ?? "") || `https://lh3.googleusercontent.com/d/${uploaded.id}=w1600`,
                modifiedTime: uploaded.modifiedTime ?? undefined,
                createdTime: uploaded.createdTime ?? undefined
            };
            await saveLatestEventPromoSetting(image);
            setLatestEventImage(image);
            setLatestEventImageSrc(image.imageUrl);
            setLatestEventImageSrcIndex(0);
            setLatestEventPromoImageName(image.name);
            showToast("อัปโหลดรูป Event ล่าสุดเรียบร้อยแล้ว");
        } catch (error) {
            console.error("อัปโหลดรูป Event ล่าสุดไม่สำเร็จ:", error);
            const message = error instanceof Error ? error.message : "อัปโหลดรูป Event ล่าสุดไม่สำเร็จ";
            setLatestEventImageError(message);
            alert(message);
        } finally{
            setIsUploadingLatestEventImage(false);
        }
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
            lineNumber: 1493,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-background-stage",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-background-sticky",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "page-background-image"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1511,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 1510,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-18a663e8eab44d6a" + " " + "page-content-layer",
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
                                    lineNumber: 1631,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "orb orb-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1632,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-18a663e8eab44d6a" + " " + "orb orb-3"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1633,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1630,
                            columnNumber: 11
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
                                                lineNumber: 1649,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1642,
                                            columnNumber: 15
                                        }, this),
                                        "OomBam Blossom FC"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1637,
                                    columnNumber: 13
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
                                                lineNumber: 1663,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void doLogout(),
                                                className: "jsx-18a663e8eab44d6a" + " " + "btn-nav btn-logout",
                                                children: "ออกจากระบบ"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1665,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1662,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: openLoginModal,
                                        className: "jsx-18a663e8eab44d6a" + " " + "btn-nav btn-login",
                                        children: "🔐 Admin Login"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1674,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1660,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1636,
                            columnNumber: 11
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
                                                lineNumber: 1689,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "jsx-18a663e8eab44d6a",
                                                children: selectedEvent.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1697,
                                                columnNumber: 19
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
                                                lineNumber: 1700,
                                                columnNumber: 21
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
                                                                lineNumber: 1712,
                                                                columnNumber: 23
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
                                                                lineNumber: 1713,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1711,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: "var(--border)"
                                                        },
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1721,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "detail-stat",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-label",
                                                                children: "เงินออก"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1724,
                                                                columnNumber: 23
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
                                                                lineNumber: 1725,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1723,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: "var(--border)"
                                                        },
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1733,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "detail-stat",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-label",
                                                                children: "ยอดสุทธิ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1736,
                                                                columnNumber: 23
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
                                                                lineNumber: 1737,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1735,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: "var(--border)"
                                                        },
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1751,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "detail-stat",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-label",
                                                                children: "จำนวนรายการ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1754,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    color: "var(--accent)"
                                                                },
                                                                className: "jsx-18a663e8eab44d6a" + " " + "detail-stat-val",
                                                                children: selectedEventStats.count
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1755,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1753,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1710,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1688,
                                        columnNumber: 17
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
                                                        lineNumber: 1767,
                                                        columnNumber: 21
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
                                                                        lineNumber: 1790,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "income",
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "เงินเข้า"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1791,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "expense",
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "เงินออก"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1792,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1776,
                                                                columnNumber: 23
                                                            }, this),
                                                            isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: openCreateTransactionModal,
                                                                className: "jsx-18a663e8eab44d6a" + " " + "btn btn-success",
                                                                children: "➕ เพิ่มรายการ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1796,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1769,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1766,
                                                columnNumber: 19
                                            }, this),
                                            filteredTransactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "empty-state",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "empty-icon",
                                                        children: "🧾"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1809,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: [
                                                            "ยังไม่มีรายการ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                className: "jsx-18a663e8eab44d6a"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1812,
                                                                columnNumber: 25
                                                            }, this),
                                                            transactionFilter ? "ไม่พบรายการในประเภทนี้" : "รายการเงินเข้าและเงินออกจะแสดงที่นี่"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1810,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1808,
                                                columnNumber: 21
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
                                                                                lineNumber: 1827,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "jsx-18a663e8eab44d6a" + " " + "tx-date",
                                                                                children: [
                                                                                    formatDate(transaction.date),
                                                                                    transaction.time ? ` • ${transaction.time.slice(0, 5)}` : ""
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1828,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1826,
                                                                        columnNumber: 29
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
                                                                        lineNumber: 1834,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1825,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "tx-chips",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a" + " " + `chip ${transaction.type === "income" ? "chip-income" : "chip-expense"}`,
                                                                        children: transaction.type === "income" ? "💰 เงินเข้า" : "💸 เงินออก"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1841,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    transaction.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a" + " " + "chip chip-file",
                                                                        children: [
                                                                            "📝 ",
                                                                            transaction.note
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1853,
                                                                        columnNumber: 31
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
                                                                            lineNumber: 1860,
                                                                            columnNumber: 33
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
                                                                            lineNumber: 1870,
                                                                            columnNumber: 33
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
                                                                                lineNumber: 1886,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>void deleteTransaction(transaction.id),
                                                                                className: "jsx-18a663e8eab44d6a" + " " + "chip chip-expense",
                                                                                children: "🗑️ ลบ"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1896,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1885,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1840,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, transaction.id, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1821,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1819,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1765,
                                        columnNumber: 17
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
                                                        lineNumber: 1916,
                                                        columnNumber: 21
                                                    }, this),
                                                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>openEditEventModal(selectedEvent),
                                                        className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                                        children: "⚙️ ตั้งค่าลิงก์สื่อ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1919,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1915,
                                                columnNumber: 19
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
                                                                            lineNumber: 1933,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1932,
                                                                        columnNumber: 25
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
                                                                        lineNumber: 1937,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1931,
                                                                columnNumber: 23
                                                            }, this),
                                                            isLoadingEventImages ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty slideshow-loading",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-18a663e8eab44d6a" + " " + "slideshow-spinner"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1945,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "กำลังโหลดรูปจาก Google Drive..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1946,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1944,
                                                                columnNumber: 25
                                                            }, this) : eventImagesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty-icon",
                                                                        children: "⚠️"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1950,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: eventImagesError
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1951,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1949,
                                                                columnNumber: 25
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
                                                                                lineNumber: 1956,
                                                                                columnNumber: 29
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
                                                                                lineNumber: 1958,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "jsx-18a663e8eab44d6a" + " " + "slideshow-top-gradient"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1971,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "jsx-18a663e8eab44d6a" + " " + "slideshow-bottom-gradient"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1972,
                                                                                columnNumber: 29
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
                                                                                        lineNumber: 1978,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        "aria-label": "รูปถัดไป",
                                                                                        onClick: ()=>setSelectedImageIndex((current)=>current === selectedEventImages.length - 1 ? 0 : current + 1),
                                                                                        className: "jsx-18a663e8eab44d6a" + " " + "slideshow-arrow next",
                                                                                        children: "›"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/page.tsx",
                                                                                        lineNumber: 1993,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1977,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1955,
                                                                        columnNumber: 27
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
                                                                                            lineNumber: 2030,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-18a663e8eab44d6a" + " " + "slideshow-thumb-number",
                                                                                            children: index + 1
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/page.tsx",
                                                                                            lineNumber: 2035,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, `${image.id}-${index}`, true, {
                                                                                    fileName: "[project]/app/page.tsx",
                                                                                    lineNumber: 2017,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2015,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2012,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1954,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a" + " " + "slideshow-empty-icon",
                                                                        children: "🖼️"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2046,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "ยังไม่มีรูปภาพในโฟลเดอร์ Google Drive นี้"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2047,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2045,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1930,
                                                        columnNumber: 21
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
                                                                        lineNumber: 2055,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2054,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2053,
                                                                columnNumber: 23
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
                                                                    lineNumber: 2066,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2059,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2052,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1929,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1914,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1687,
                                columnNumber: 15
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
                                        lineNumber: 2079,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "section latest-event-section",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "section-header",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "section-title",
                                                        children: "Event ล่าสุด"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2083,
                                                        columnNumber: 21
                                                    }, this),
                                                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: "latest-event-promo-upload",
                                                                type: "file",
                                                                accept: "image/jpeg,image/png,image/webp,image/gif",
                                                                hidden: true,
                                                                disabled: isUploadingLatestEventImage,
                                                                onChange: (event)=>{
                                                                    const file = event.target.files?.[0] ?? null;
                                                                    event.currentTarget.value = "";
                                                                    void handleLatestEventImageUpload(file);
                                                                },
                                                                className: "jsx-18a663e8eab44d6a"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2087,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "latest-event-promo-upload",
                                                                className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary btn-sm latest-event-upload-btn",
                                                                children: isUploadingLatestEventImage ? "⏳ กำลังอัปโหลด..." : "⬆️ อัปโหลดรูป"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2099,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2086,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2082,
                                                columnNumber: 19
                                            }, this),
                                            isUploadingLatestEventImage && !latestEventImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "latest-event-card latest-event-loading",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "slideshow-spinner"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2113,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: "กำลังอัปโหลดรูป Event ล่าสุด..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2114,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2112,
                                                columnNumber: 21
                                            }, this) : latestEventImageError && !latestEventImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "latest-event-card latest-event-empty",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "latest-event-icon",
                                                        children: "⚠️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2118,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: latestEventImageError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2119,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2117,
                                                columnNumber: 21
                                            }, this) : latestEventImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "latest-event-card latest-event-image-only",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-18a663e8eab44d6a" + " " + "latest-event-image-wrap",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: latestEventImageSrc || latestEventImage.imageUrl,
                                                        alt: latestEventPromoImageName ? `ภาพโปรโมท ${latestEventPromoImageName}` : "ภาพโปรโมท Event ล่าสุด",
                                                        onError: (event)=>{
                                                            const candidates = getLatestEventImageCandidates(latestEventImage);
                                                            const nextIndex = latestEventImageSrcIndex + 1;
                                                            if (nextIndex < candidates.length) {
                                                                setLatestEventImageSrcIndex(nextIndex);
                                                                setLatestEventImageSrc(candidates[nextIndex]);
                                                                return;
                                                            }
                                                            event.currentTarget.style.opacity = "0.35";
                                                            setLatestEventImageError("พบรูปใน Google Drive แต่ไม่สามารถแสดงรูปได้ อาจเป็นเรื่องสิทธิ์การเข้าถึงไฟล์");
                                                        },
                                                        className: "jsx-18a663e8eab44d6a" + " " + "latest-event-image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2124,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2123,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2122,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "latest-event-card latest-event-empty",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "latest-event-icon",
                                                        children: "🖼️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2152,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-18a663e8eab44d6a",
                                                        children: "ยังไม่มีรูป Event ล่าสุด"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2153,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2151,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2081,
                                        columnNumber: 17
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
                                                                    lineNumber: 2161,
                                                                    columnNumber: 66
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2161,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "stat-label",
                                                                children: "รวมเงินเข้าทั้งหมด"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2162,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "stat-value",
                                                                children: [
                                                                    "฿",
                                                                    formatMoney(globalStats.income)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2163,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2160,
                                                        columnNumber: 21
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
                                                                    lineNumber: 2169,
                                                                    columnNumber: 66
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2169,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "stat-label",
                                                                children: "รวมเงินออกทั้งหมด"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2170,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "stat-value",
                                                                children: [
                                                                    "฿",
                                                                    formatMoney(globalStats.expense)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2171,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2168,
                                                        columnNumber: 21
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
                                                                    lineNumber: 2180,
                                                                    columnNumber: 66
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2180,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "stat-label",
                                                                children: "ยอดคงเหลือสุทธิ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2181,
                                                                columnNumber: 23
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
                                                                lineNumber: 2182,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2176,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2159,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "section-header",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "section-title",
                                                        children: "สรุป Event ทั้งหมด"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2190,
                                                        columnNumber: 21
                                                    }, this),
                                                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: openCreateEventModal,
                                                        className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                                        children: "➕ เพิ่ม Event"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2193,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2189,
                                                columnNumber: 19
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
                                                                        lineNumber: 2207,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "รายการ"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2208,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "เงินเข้า (฿)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2209,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "เงินออก (฿)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2210,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "ยอดสุทธิ (฿)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2211,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: "จัดการ"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2212,
                                                                        columnNumber: 39
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2206,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2205,
                                                            columnNumber: 23
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
                                                                                lineNumber: 2221,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: [
                                                                                    "ยังไม่มี Event",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                                        className: "jsx-18a663e8eab44d6a"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/page.tsx",
                                                                                        lineNumber: 2224,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    isAdmin ? 'คลิก "เพิ่ม Event" เพื่อเริ่มต้น' : "รอข้อมูลจาก Admin"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2222,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2220,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2219,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2218,
                                                                columnNumber: 27
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
                                                                                    lineNumber: 2269,
                                                                                    columnNumber: 37
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
                                                                                    lineNumber: 2282,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2265,
                                                                            columnNumber: 33
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
                                                                                lineNumber: 2295,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2294,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "jsx-18a663e8eab44d6a" + " " + "td-income",
                                                                            children: [
                                                                                "฿",
                                                                                formatMoney(income)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2300,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "jsx-18a663e8eab44d6a" + " " + "td-expense",
                                                                            children: [
                                                                                "฿",
                                                                                formatMoney(expense)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2304,
                                                                            columnNumber: 33
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
                                                                            lineNumber: 2308,
                                                                            columnNumber: 33
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
                                                                                        lineNumber: 2323,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        onClick: ()=>void deleteEvent(event.id),
                                                                                        className: "jsx-18a663e8eab44d6a" + " " + "btn btn-danger btn-sm",
                                                                                        children: "🗑️"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/page.tsx",
                                                                                        lineNumber: 2333,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2322,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 2317,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, event.id, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 2261,
                                                                    columnNumber: 31
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 2216,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 2204,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2203,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2158,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-section",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-18a663e8eab44d6a" + " " + "donate-card",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "donate-text donate-text-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-eyebrow",
                                                        children: "ร่วมสนับสนุน"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2357,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-title",
                                                        children: [
                                                            "ร่วมเป็นส่วนหนึ่งของ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                className: "jsx-18a663e8eab44d6a"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2361,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-18a663e8eab44d6a",
                                                                children: "OomBam Blossom FC"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2362,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2359,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-desc",
                                                        children: "ทุกการสนับสนุนของคุณจะช่วยให้โปรเจคนี้เดินหน้าต่อไปได้ โอนได้ตามข้อมูลด้านล่าง แล้วอัปโหลดสลิปได้เลย ขอบคุณทุกแรงใจที่มอบให้ 🌸"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2365,
                                                        columnNumber: 23
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
                                                                lineNumber: 2380,
                                                                columnNumber: 25
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
                                                                                lineNumber: 2398,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: bankName || "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2399,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2397,
                                                                        columnNumber: 27
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
                                                                                lineNumber: 2403,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: bankAccountNumber || "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2404,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2402,
                                                                        columnNumber: 27
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
                                                                                lineNumber: 2408,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: bankAccountName || "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2409,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2407,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2390,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2371,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-methods",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + `donate-method donate-method-button donate-method-upload${isUploadingPublicSlip ? " is-loading" : ""}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        accept: "image/jpeg,image/png,image/webp,image/gif,application/pdf",
                                                                        disabled: isUploadingPublicSlip,
                                                                        onChange: (event)=>{
                                                                            const file = event.target.files?.[0] ?? null;
                                                                            void handlePublicSlipUpload(file);
                                                                            event.currentTarget.value = "";
                                                                        },
                                                                        hidden: true,
                                                                        className: "jsx-18a663e8eab44d6a"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2418,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    isUploadingPublicSlip ? "⏳ กำลังอัปโหลด..." : "📎 อัปโหลดสลิป"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2415,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>void copyBankAccount(),
                                                                className: "jsx-18a663e8eab44d6a" + " " + "donate-method donate-method-button donate-method-copy",
                                                                children: "📋 คัดลอกหมายเลขบัญชี"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2432,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2414,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "donate-upload-hint",
                                                        children: "รองรับ JPG, PNG, WEBP, GIF หรือ PDF ขนาดไม่เกิน 4 MB"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2441,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2356,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2355,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2354,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 2078,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1685,
                            columnNumber: 11
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
                                                lineNumber: 2462,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: closeEventModal,
                                                className: "jsx-18a663e8eab44d6a" + " " + "modal-close",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2466,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2461,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "ชื่อ Event *"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2476,
                                                columnNumber: 19
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
                                                lineNumber: 2477,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2475,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "วันที่ Event *"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2488,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: eventDate,
                                                onChange: (event)=>setEventDate(event.target.value),
                                                required: true,
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2489,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "drive-hint",
                                                children: "📅 วันที่จัด Event จริง"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2496,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2487,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "รายละเอียด (ไม่บังคับ)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2502,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 3,
                                                placeholder: "รายละเอียดเพิ่มเติม...",
                                                value: eventDesc,
                                                onChange: (event)=>setEventDesc(event.target.value),
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2505,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2501,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "🖼️ ลิงก์โฟลเดอร์รูปภาพ Google Drive"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2515,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "url",
                                                placeholder: "https://drive.google.com/drive/folders/...",
                                                value: imageFolderUrl,
                                                onChange: (event)=>setImageFolderUrl(event.target.value),
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2518,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "drive-hint",
                                                children: [
                                                    "📌 ใส่ลิงก์โฟลเดอร์เพียง 1 ลิงก์ ระบบจะดึงรูปทั้งหมดในโฟลเดอร์",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                        className: "jsx-18a663e8eab44d6a"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2527,
                                                        columnNumber: 21
                                                    }, this),
                                                    "🔓 ต้องตั้งโฟลเดอร์เป็น “ทุกคนที่มีลิงก์ → ผู้ดู”"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2525,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2514,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "ลิงก์ภาพตารางงาน (Google Drive - ไม่บังคับ)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2533,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "url",
                                                placeholder: "https://drive.google.com/file/d/...",
                                                value: scheduleUrl,
                                                onChange: (event)=>setScheduleUrl(event.target.value),
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2536,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: "8px"
                                                },
                                                className: "jsx-18a663e8eab44d6a" + " " + "drive-hint",
                                                children: "📎 ใส่ลิงก์ภาพตารางงาน หรือเว้นว่างเพื่อใช้ภาพเริ่มต้น"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2543,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2532,
                                        columnNumber: 17
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
                                                lineNumber: 2552,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void saveEvent(),
                                                className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                                children: "💾 บันทึก"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2560,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2551,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 2460,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2452,
                            columnNumber: 13
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
                                                lineNumber: 2583,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: closeTransactionModal,
                                                className: "jsx-18a663e8eab44d6a" + " " + "modal-close",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2589,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2582,
                                        columnNumber: 17
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
                                                        lineNumber: 2600,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: transactionDate,
                                                        onChange: (event)=>setTransactionDate(event.target.value),
                                                        className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2601,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2599,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                        children: "เวลา"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2612,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "time",
                                                        step: "1",
                                                        value: transactionTime,
                                                        onChange: (event)=>setTransactionTime(event.target.value),
                                                        className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2613,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2611,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                        children: "ประเภท *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2625,
                                                        columnNumber: 21
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
                                                                lineNumber: 2635,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "expense",
                                                                className: "jsx-18a663e8eab44d6a",
                                                                children: "เงินออก"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2636,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2626,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2624,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2598,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "รายละเอียด *"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2642,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "เช่น เงินสนับสนุน, ค่าเดินทาง, ค่าอาหาร...",
                                                value: transactionDesc,
                                                onChange: (event)=>setTransactionDesc(event.target.value),
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2643,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2641,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "จำนวนเงิน (฿) *"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2655,
                                                columnNumber: 19
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
                                                lineNumber: 2658,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2654,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "หมายเหตุ (ไม่บังคับ)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2675,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 3,
                                                placeholder: "รายละเอียดเพิ่มเติม...",
                                                value: transactionNote,
                                                onChange: (event)=>setTransactionNote(event.target.value),
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-control"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2678,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2674,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "📎 ไฟล์ประกอบรายการ"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2690,
                                                columnNumber: 19
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
                                                                lineNumber: 2694,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-title",
                                                                children: "อัปโหลดสลิป"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2695,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-subtitle",
                                                                children: "ระบบจะอ่านธนาคาร ประเภท ผู้โอน ผู้รับ วันที่ เวลา และจำนวนเงิน"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2696,
                                                                columnNumber: 23
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
                                                                lineNumber: 2699,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2693,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-card transaction-upload-document",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-icon",
                                                                children: "📎"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2716,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-title",
                                                                children: "อัปโหลดเอกสาร"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2717,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-18a663e8eab44d6a" + " " + "transaction-upload-subtitle",
                                                                children: "PDF, JPG, PNG, WEBP, GIF"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2718,
                                                                columnNumber: 23
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
                                                                lineNumber: 2721,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2715,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2692,
                                                columnNumber: 19
                                            }, this),
                                            isReadingSlip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "drive-hint slip-reading-status",
                                                children: "🔎 กำลังอ่านข้อมูลจากสลิป..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2740,
                                                columnNumber: 21
                                            }, this),
                                            slipError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "error-msg show",
                                                children: slipError
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2746,
                                                columnNumber: 21
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
                                                                lineNumber: 2752,
                                                                columnNumber: 25
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
                                                                                lineNumber: 2759,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            transactionSlipData.bankName || "ไม่พบข้อมูล"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2758,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: "ประเภท:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2763,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            transactionSlipData.transactionType === "income" ? "เงินเข้า" : transactionSlipData.transactionType === "expense" ? "เงินออก" : "ไม่ระบุ"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2762,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: "ผู้โอน:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2771,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            transactionSlipData.payerName || "ไม่พบข้อมูล"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2770,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: "ผู้รับ:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2775,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            transactionSlipData.payeeName || "ไม่พบข้อมูล"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2774,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: "วันที่:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2779,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            transactionSlipData.transferDate || "ไม่พบข้อมูล"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2778,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: "เวลา:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2783,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            transactionSlipData.transferTime || "ไม่พบข้อมูล"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2782,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-18a663e8eab44d6a",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-18a663e8eab44d6a",
                                                                                children: "จำนวนเงิน:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 2787,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            typeof transactionSlipData.amount === "number" ? `฿${formatMoney(transactionSlipData.amount)}` : "ไม่พบข้อมูล"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 2786,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2757,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2751,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: removeTransactionSlip,
                                                        disabled: isUploadingAttachment,
                                                        className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                                        children: "ลบสลิป"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2796,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2750,
                                                columnNumber: 21
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
                                                                lineNumber: 2814,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>removeNewTransactionAttachment(index),
                                                                disabled: isUploadingAttachment,
                                                                className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                                                children: "ลบ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2818,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, `${file.name}-${file.lastModified}-${index}`, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2810,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2808,
                                                columnNumber: 21
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
                                                                lineNumber: 2838,
                                                                columnNumber: 27
                                                            }, this),
                                                            isImageAttachment(attachment) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setPreviewAttachment(attachment),
                                                                className: "jsx-18a663e8eab44d6a" + " " + "btn btn-ghost btn-sm",
                                                                children: "ดูตัวอย่าง"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 2848,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, attachment.id, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 2834,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2832,
                                                columnNumber: 21
                                            }, this),
                                            getAttachmentSlotCount() === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-hint",
                                                children: "แนบได้สูงสุด 5 ไฟล์ต่อรายการ • สลิป 1 ไฟล์ + เอกสารหลายไฟล์ • ไฟล์ละไม่เกิน 4 MB"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2862,
                                                columnNumber: 21
                                            }, this),
                                            getAttachmentSlotCount() >= 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "transaction-file-hint",
                                                children: "✓ แนบครบ 5 ไฟล์แล้ว"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2868,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2689,
                                        columnNumber: 17
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
                                        lineNumber: 2875,
                                        columnNumber: 19
                                    }, this),
                                    attachmentError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "error-msg show",
                                        children: attachmentError
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2885,
                                        columnNumber: 19
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
                                                lineNumber: 2888,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void saveTransaction(),
                                                className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                                children: "💾 บันทึก"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2896,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2887,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 2581,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2573,
                            columnNumber: 13
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
                                        lineNumber: 2918,
                                        columnNumber: 17
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
                                            lineNumber: 2927,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2920,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "อีเมล"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2936,
                                                columnNumber: 19
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
                                                lineNumber: 2937,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2935,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "form-label",
                                                children: "รหัสผ่าน"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2951,
                                                columnNumber: 19
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
                                                lineNumber: 2952,
                                                columnNumber: 19
                                            }, this),
                                            loginError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-18a663e8eab44d6a" + " " + "error-msg show",
                                                children: loginError
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2969,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2950,
                                        columnNumber: 17
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
                                                lineNumber: 2976,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void doLogin(),
                                                className: "jsx-18a663e8eab44d6a" + " " + "btn btn-primary",
                                                children: "🔓 เข้าสู่ระบบ"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 2984,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 2975,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 2917,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2909,
                            columnNumber: 13
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
                                        lineNumber: 3015,
                                        columnNumber: 17
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
                                        lineNumber: 3024,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 3005,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 2997,
                            columnNumber: 13
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
                                        lineNumber: 3050,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: getAttachmentImagePreviewUrl(previewAttachment),
                                        alt: previewAttachment.name,
                                        className: "jsx-18a663e8eab44d6a"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 3059,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-18a663e8eab44d6a" + " " + "transaction-preview-caption",
                                        children: previewAttachment.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 3064,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 3049,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 3041,
                            columnNumber: 13
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
                                lineNumber: 3073,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 3072,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 1514,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 1509,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 1508,
        columnNumber: 5
    }, this);
}
_s(Home, "EsQLTKK5F5YPgQhh6m6eIJ8LE6Q=", false, function() {
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