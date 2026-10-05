/* =========================================================
   OomBam Blossom FC
   Next.js + Supabase
   Supabase only
   ========================================================= */

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

type EventItem = {
  id: string;
  name: string;
  desc: string;
  imageFolderUrl: string;
  scheduleUrl: string;
  createdAt: string;
};

type TransactionAttachment = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  webContentLink?: string | null;
  category?: "slip" | "document";
};

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

type TransactionItem = {
  id: string;
  eventId: string;
  date: string;
  time: string;
  type: "income" | "expense";
  desc: string;
  amount: number;
  note: string;
  attachments: TransactionAttachment[];
  slipData: SlipData | null;
  createdAt: string;
};

type EventRow = {
  id: string;
  name: string;
  description: string | null;
  image_folder_url: string | null;
  schedule_url: string | null;
  created_at: string;
};

type TransactionRow = {
  id: string;
  event_id: string;
  date: string;
  time: string | null;
  type: "income" | "expense";
  description: string;
  amount: number | string;
  note: string | null;
  attachments: unknown;
  slip_data: unknown;
  attachment_url: string | null;
  attachment_name: string | null;
  created_at: string;
};

type SettingRow = {
  key: string;
  value: string | null;
  updated_at: string;
};

type DriveImage = {
  id: string;
  name: string;
  mimeType: string;
  imageUrl: string;
};

const DEFAULT_SCHEDULE_URL =
  "https://lh3.googleusercontent.com/d/1hHGB04z7b-y1IuuBrl3X2CkLUpM1BAAX=s0";

function formatMoney(value: number) {
  return value.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(date: string) {
  if (!date) return "—";

  const value = new Date(`${date}T00:00:00`);

  if (Number.isNaN(value.getTime())) return date;

  return value.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDriveFileId(url: string) {
  const value = url.trim();
  if (!value) return null;

  const patterns = [
    /drive\.google\.com\/file\/d\/([^/]+)/i,
    /[?&]id=([^&]+)/i,
    /lh3\.googleusercontent\.com\/d\/([^=/?]+)/i,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

function getDriveImageUrl(url: string) {
  const fileId = getDriveFileId(url);
  if (!fileId) return url.trim();

  return `https://lh3.googleusercontent.com/d/${fileId}=w1600`;
}

function getDriveThumbUrl(url: string) {
  const fileId = getDriveFileId(url);
  if (!fileId) return url.trim();

  return `https://lh3.googleusercontent.com/d/${fileId}=w320`;
}

function getScheduleImageUrl(url: string) {
  if (!url.trim()) return DEFAULT_SCHEDULE_URL;

  const driveId =
    url.match(/\/d\/([\w-]+)/)?.[1] ?? url.match(/[?&]id=([\w-]+)/)?.[1];

  return driveId
    ? `https://lh3.googleusercontent.com/d/${driveId}=s0`
    : url;
}

function getQrImageUrl(url: string) {
  if (!url.trim()) return "";

  const driveId =
    url.match(/\/d\/([\w-]+)/)?.[1] ??
    url.match(/[?&]id=([\w-]+)/)?.[1];

  // ใช้วิธีเดียวกับภาพตารางงานที่แสดงได้อยู่แล้ว
  return driveId
    ? `https://lh3.googleusercontent.com/d/${driveId}=s0`
    : url;
}

function isImageAttachment(attachment: TransactionAttachment) {
  if (attachment.mimeType.startsWith("image/")) return true;

  return /\.(jpe?g|png|webp|gif)$/i.test(attachment.name);
}

function getAttachmentImagePreviewUrl(attachment: TransactionAttachment) {
  const id =
    attachment.id ||
    getDriveFileId(attachment.webViewLink) ||
    "";

  return id.startsWith("legacy-")
    ? attachment.webViewLink
    : `https://lh3.googleusercontent.com/d/${id}=s0`;
}

function getAttachmentDownloadUrl(attachment: TransactionAttachment) {
  return attachment.webContentLink || attachment.webViewLink;
}

function mapEvent(row: EventRow): EventItem {
  return {
    id: row.id,
    name: row.name,
    desc: row.description ?? "",
    imageFolderUrl: row.image_folder_url ?? "",
    scheduleUrl: row.schedule_url ?? "",
    createdAt: row.created_at,
  };
}

function mapTransaction(row: TransactionRow): TransactionItem {
  const rawAttachments = Array.isArray(row.attachments)
    ? row.attachments
    : [];

  const attachments = rawAttachments
    .filter(
      (item): item is Record<string, unknown> =>
        !!item &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).id === "string" &&
        typeof (item as Record<string, unknown>).name === "string" &&
        typeof (item as Record<string, unknown>).mimeType === "string",
    )
    .map((item): TransactionAttachment => ({
      id: String(item.id),
      name: String(item.name),
      mimeType: String(item.mimeType),
      webViewLink:
        typeof item.webViewLink === "string"
          ? item.webViewLink
          : `https://drive.google.com/file/d/${String(item.id)}/view`,
      webContentLink:
        typeof item.webContentLink === "string"
          ? item.webContentLink
          : null,
      category:
        item.category === "slip" || item.category === "document"
          ? item.category
          : undefined,
    }));

  // รองรับข้อมูลเก่าแบบไฟล์เดียวจาก attachment_url / attachment_name
  if (
    attachments.length === 0 &&
    row.attachment_url &&
    row.attachment_name
  ) {
    const id =
      row.attachment_url.match(/\/d\/([\w-]+)/)?.[1] ??
      row.attachment_url.match(/[?&]id=([\w-]+)/)?.[1];

    attachments.push({
      id: id ?? `legacy-${row.id}`,
      name: row.attachment_name,
      mimeType: "application/octet-stream",
      webViewLink: row.attachment_url,
      webContentLink: null,
    });
  }

  const rawSlipData =
    row.slip_data && typeof row.slip_data === "object"
      ? (row.slip_data as Record<string, unknown>)
      : null;

  const slipData: SlipData | null = rawSlipData
    ? {
      bankName: String(rawSlipData.bankName ?? ""),
      transactionType:
        rawSlipData.transactionType === "income" ||
          rawSlipData.transactionType === "expense"
          ? rawSlipData.transactionType
          : "unknown",
      payerName: String(rawSlipData.payerName ?? ""),
      payerAccount: String(rawSlipData.payerAccount ?? ""),
      payeeName: String(rawSlipData.payeeName ?? ""),
      payeeAccount: String(rawSlipData.payeeAccount ?? ""),
      transferDate: String(rawSlipData.transferDate ?? ""),
      transferTime: String(rawSlipData.transferTime ?? ""),
      amount:
        rawSlipData.amount === null || rawSlipData.amount === undefined
          ? null
          : Number(rawSlipData.amount),
    }
    : null;

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
    createdAt: row.created_at,
  };
}

export default function Home({ initialEventId }: { initialEventId?: string } = {}) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [events, setEvents] = useState<EventItem[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEventId ?? null);

  const [isReady, setIsReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [imageFolderUrl, setImageFolderUrl] = useState("");
  const [scheduleUrl, setScheduleUrl] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(
    null,
  );
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionTime, setTransactionTime] = useState("");
  const [transactionType, setTransactionType] =
    useState<"income" | "expense">("income");
  const [transactionDesc, setTransactionDesc] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionNote, setTransactionNote] = useState("");
  const [transactionSlipFile, setTransactionSlipFile] = useState<File | null>(null);
  const [transactionSlipData, setTransactionSlipData] = useState<SlipData | null>(null);
  const [isReadingSlip, setIsReadingSlip] = useState(false);
  const [slipError, setSlipError] = useState("");
  const [transactionAttachments, setTransactionAttachments] = useState<File[]>([]);
  const [transactionExistingAttachments, setTransactionExistingAttachments] =
    useState<TransactionAttachment[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const [attachmentUploadProgress, setAttachmentUploadProgress] = useState(0);
  const [previewAttachment, setPreviewAttachment] =
    useState<TransactionAttachment | null>(null);
  const [isSchedulePreviewOpen, setIsSchedulePreviewOpen] = useState(false);
  const [transactionFilter, setTransactionFilter] =
    useState<"" | "income" | "expense">("");

  const [qrUrl, setQrUrl] = useState("");
  const [qrInput, setQrInput] = useState("");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const [selectedEventImages, setSelectedEventImages] = useState<DriveImage[]>([]);
  const [isLoadingEventImages, setIsLoadingEventImages] = useState(false);
  const [eventImagesError, setEventImagesError] = useState("");

  const selectedEvent =
    events.find((event) => event.id === selectedEventId) ?? null;

  useEffect(() => {
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
        const response = await fetch(
          `/api/drive-images?folder=${encodeURIComponent(folderUrl)}`,
          { cache: "no-store" },
        );

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
          setEventImagesError(
            error instanceof Error
              ? error.message
              : "โหลดรูปจาก Google Drive ไม่สำเร็จ",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingEventImages(false);
        }
      }
    }

    loadEventImages();

    return () => {
      cancelled = true;
    };
  }, [selectedEvent?.imageFolderUrl]);

  const globalStats = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const expense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  const selectedEventStats = useMemo(() => {
    if (!selectedEventId) {
      return { income: 0, expense: 0, balance: 0, count: 0 };
    }

    const eventTransactions = transactions.filter(
      (transaction) => transaction.eventId === selectedEventId,
    );

    const income = eventTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const expense = eventTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
      count: eventTransactions.length,
    };
  }, [selectedEventId, transactions]);

  const filteredTransactions = useMemo(() => {
    if (!selectedEventId) return [];

    return transactions
      .filter((transaction) => transaction.eventId === selectedEventId)
      .filter((transaction) =>
        transactionFilter ? transaction.type === transactionFilter : true,
      )
      .sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        if (dateCompare !== 0) return dateCompare;

        const timeCompare = (b.time || "").localeCompare(a.time || "");
        if (timeCompare !== 0) return timeCompare;

        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [selectedEventId, transactionFilter, transactions]);

  async function loadData() {
    const [
      { data: sessionData },
      { data: eventRows, error: eventsError },
      { data: transactionRows, error: transactionsError },
      { data: settingRows, error: settingsError },
    ] = await Promise.all([
      supabase.auth.getSession(),
      supabase
        .from("events")
        .select(
          "id, name, description, image_folder_url, schedule_url, created_at",
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("transactions")
        .select(
          "id, event_id, date, time, type, description, amount, note, attachments, slip_data, attachment_url, attachment_name, created_at",
        )
        .order("date", { ascending: false }),
      supabase
        .from("settings")
        .select("key, value, updated_at")
        .in("key", [
          "qr_url",
          "bank_name",
          "bank_account_number",
          "bank_account_name",
        ]),
    ]);

    if (eventsError) {
      console.error("โหลด Event ไม่สำเร็จ:", eventsError);
      setEvents([]);
    } else {
      setEvents((eventRows ?? []).map((row) => mapEvent(row as EventRow)));
    }

    if (transactionsError) {
      console.error("โหลด Transaction ไม่สำเร็จ:", transactionsError);
      setTransactions([]);
    } else {
      setTransactions(
        (transactionRows ?? []).map((row) =>
          mapTransaction(row as TransactionRow),
        ),
      );
    }

    if (settingsError) {
      console.error("โหลด Settings ไม่สำเร็จ:", settingsError);
      setQrUrl("");
      setBankName("");
      setBankAccountNumber("");
      setBankAccountName("");
    } else {
      const settings = ((settingRows ?? []) as SettingRow[]).reduce<
        Record<string, string>
      >((result, row) => {
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

  useEffect(() => {
    void loadData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

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
      password: loginPassword,
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

  function openEditEventModal(event: EventItem) {
    if (!isAdmin) {
      openLoginModal();
      return;
    }

    setEditingEventId(event.id);
    setEventName(event.name);
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

    if (editingEventId) {
      const { data, error } = await supabase
        .from("events")
        .update({
          name: cleanName,
          description: eventDesc.trim() || null,
          image_folder_url: imageFolderUrl.trim() || null,
          schedule_url: scheduleUrl.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingEventId)
        .select(
          "id, name, description, image_folder_url, schedule_url, created_at",
        )
        .single();

      if (error || !data) {
        console.error("แก้ไข Event ไม่สำเร็จ:", error);
        alert(`แก้ไข Event ไม่สำเร็จ\n${error?.message ?? "ไม่พบข้อมูล Event"}`);
        return;
      }

      const updatedEvent = mapEvent(data as EventRow);

      setEvents((current) =>
        current.map((event) =>
          event.id === editingEventId ? updatedEvent : event,
        ),
      );
    } else {
      const { data, error } = await supabase
        .from("events")
        .insert({
          name: cleanName,
          description: eventDesc.trim() || null,
          image_folder_url: imageFolderUrl.trim() || null,
          schedule_url: scheduleUrl.trim() || null,
        })
        .select(
          "id, name, description, image_folder_url, schedule_url, created_at",
        )
        .single();

      if (error || !data) {
        console.error("สร้าง Event ไม่สำเร็จ:", error);
        alert(`สร้าง Event ไม่สำเร็จ\n${error?.message ?? "ไม่พบข้อมูลที่สร้าง"}`);
        return;
      }

      setEvents((current) => [mapEvent(data as EventRow), ...current]);
    }

    closeEventModal();
  }

  async function deleteEvent(id: string) {
    if (!isAdmin) {
      openLoginModal();
      return;
    }

    const event = events.find((item) => item.id === id);

    if (!event) return;

    const confirmed = window.confirm(
      `ลบ Event "${event.name}" ใช่หรือไม่?\n\nการดำเนินการนี้ไม่สามารถย้อนกลับได้`,
    );

    if (!confirmed) return;

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      console.error("ลบ Event ไม่สำเร็จ:", error);
      alert(`ลบ Event ไม่สำเร็จ\n${error.message}`);
      return;
    }

    setEvents((current) => current.filter((item) => item.id !== id));
    setTransactions((current) =>
      current.filter((transaction) => transaction.eventId !== id),
    );

    if (selectedEventId === id) {
      setSelectedEventId(null);
      router.push("/");
    }
  }

  function openEventDetail(id: string) {
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

  function openEditTransactionModal(transaction: TransactionItem) {
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
    return (
      transactionExistingAttachments.length +
      transactionAttachments.length +
      (transactionSlipFile ? 1 : 0)
    );
  }

  async function handleSlipFileChange(file: File | null) {
    setSlipError("");
    if (!file) return;

    const allowedTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
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
      formData.append(
        "accountNumberLast4",
        accountDigits.slice(-4),
      );

      const response = await fetch("/api/ocr-slip", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "อ่านข้อมูลจากสลิปไม่สำเร็จ");
      }

      const parsed = data?.slip as SlipData | null;

      setTransactionSlipFile(file);
      setTransactionSlipData(parsed);

      if (
        parsed?.transactionType === "income" ||
        parsed?.transactionType === "expense"
      ) {
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
        setTransactionDesc(
          [payer, payee].filter(Boolean).join(" → ") || transactionDesc,
        );
      }

      const ownName = bankAccountName.trim().toLowerCase();
      const ownAccount = bankAccountNumber.replace(/\D/g, "");
      const payerAccount = (parsed?.payerAccount ?? "").replace(/\D/g, "");
      const payeeAccount = (parsed?.payeeAccount ?? "").replace(/\D/g, "");
      const payerMatchesOwn =
        (!!ownName && payer.toLowerCase().includes(ownName)) ||
        (!!ownAccount && payerAccount.endsWith(ownAccount));
      const payeeMatchesOwn =
        (!!ownName && payee.toLowerCase().includes(ownName)) ||
        (!!ownAccount && payeeAccount.endsWith(ownAccount));

      if (payeeMatchesOwn && !payerMatchesOwn) {
        setTransactionType("income");
      } else if (payerMatchesOwn && !payeeMatchesOwn) {
        setTransactionType("expense");
      }
    } catch (error) {
      console.error("อ่านสลิปไม่สำเร็จ:", error);
      setTransactionSlipFile(null);
      setTransactionSlipData(null);
      setSlipError(
        error instanceof Error ? error.message : "อ่านข้อมูลจากสลิปไม่สำเร็จ",
      );
    } finally {
      setIsReadingSlip(false);
    }
  }

  function handleTransactionDocumentChange(files: FileList | null) {
    setAttachmentError("");
    if (!files) return;

    const selected = Array.from(files);

    const allowedTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
    ]);

    const invalidType = selected.find((file) => !allowedTypes.has(file.type));
    if (invalidType) {
      setAttachmentError(
        `ไฟล์ "${invalidType.name}" ไม่รองรับ รองรับรูปภาพ JPG, PNG, WEBP, GIF และ PDF`,
      );
      return;
    }

    const tooLarge = selected.find((file) => file.size > 4 * 1024 * 1024);
    if (tooLarge) {
      setAttachmentError(`ไฟล์ "${tooLarge.name}" มีขนาดเกิน 4 MB`);
      return;
    }

    const availableSlots = 5 - getAttachmentSlotCount();

    if (selected.length > availableSlots) {
      setAttachmentError(
        `แนบไฟล์ได้สูงสุด 5 ไฟล์ต่อรายการ (ตอนนี้เหลือ ${availableSlots} ช่อง)`,
      );
      return;
    }

    setTransactionAttachments((current) => [...current, ...selected]);
  }

  function removeTransactionSlip() {
    setTransactionSlipFile(null);
    setTransactionSlipData(null);
    setSlipError("");
  }

  function removeNewTransactionAttachment(index: number) {
    setTransactionAttachments((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
    setAttachmentError("");
  }

  async function uploadTransactionAttachment(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/google/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "ยังไม่ได้เชื่อมต่อ Google Drive กรุณาเชื่อม Google Drive ก่อนอัปโหลดไฟล์",
        );
      }

      throw new Error(data?.error || "อัปโหลดไฟล์ไม่สำเร็จ");
    }

    return data.file as TransactionAttachment & {
      size?: string;
    };
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

    let finalAttachments = [...transactionExistingAttachments];
    const filesToUpload: Array<{ file: File; category: "slip" | "document" }> = [];

    if (transactionSlipFile) {
      filesToUpload.push({ file: transactionSlipFile, category: "slip" });
    }

    for (const file of transactionAttachments) {
      filesToUpload.push({ file, category: "document" });
    }

    if (filesToUpload.length > 0) {
      setIsUploadingAttachment(true);
      setAttachmentUploadProgress(0);

      try {
        for (let index = 0; index < filesToUpload.length; index += 1) {
          const { file, category } = filesToUpload[index];
          const uploadedFile = await uploadTransactionAttachment(file);

          finalAttachments.push({
            id: uploadedFile.id,
            name: uploadedFile.name,
            mimeType: uploadedFile.mimeType,
            webViewLink:
              uploadedFile.webViewLink ??
              `https://drive.google.com/file/d/${uploadedFile.id}/view`,
            webContentLink: uploadedFile.webContentLink ?? null,
            category,
          });

          setAttachmentUploadProgress(index + 1);
        }
      } catch (error) {
        console.error("อัปโหลดไฟล์แนบไม่สำเร็จ:", error);
        alert(
          error instanceof Error
            ? error.message
            : "อัปโหลดไฟล์แนบไม่สำเร็จ",
        );
        return;
      } finally {
        setIsUploadingAttachment(false);
      }
    }

    const firstAttachment = finalAttachments[0];

    const attachmentPayload = {
      attachments: finalAttachments,
      slip_data: transactionSlipData,
      // เก็บค่าเดิมไว้ด้วยเพื่อ backward compatibility
      attachment_url: firstAttachment?.webViewLink || null,
      attachment_name: firstAttachment?.name || null,
    };

    if (editingTransactionId) {
      const { data, error } = await supabase
        .from("transactions")
        .update({
          date: transactionDate,
          time: transactionTime || null,
          type: transactionType,
          description: cleanDesc,
          amount,
          note: transactionNote.trim() || null,
          ...attachmentPayload,
        })
        .eq("id", editingTransactionId)
        .eq("event_id", selectedEventId)
        .select(
          "id, event_id, date, time, type, description, amount, note, attachments, slip_data, attachment_url, attachment_name, created_at",
        )
        .single();

      if (error || !data) {
        console.error("แก้ไขรายการไม่สำเร็จ:", error);
        alert(
          `แก้ไขรายการไม่สำเร็จ\n${error?.message ?? "ไม่พบรายการ"}`,
        );
        return;
      }

      const updatedTransaction = mapTransaction(data as TransactionRow);

      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === editingTransactionId
            ? updatedTransaction
            : transaction,
        ),
      );
    } else {
      const { data, error } = await supabase
        .from("transactions")
        .insert({
          event_id: selectedEventId,
          date: transactionDate,
          time: transactionTime || null,
          type: transactionType,
          description: cleanDesc,
          amount,
          note: transactionNote.trim() || null,
          ...attachmentPayload,
        })
        .select(
          "id, event_id, date, time, type, description, amount, note, attachments, slip_data, attachment_url, attachment_name, created_at",
        )
        .single();

      if (error || !data) {
        console.error("เพิ่มรายการไม่สำเร็จ:", error);
        alert(
          `เพิ่มรายการไม่สำเร็จ\n${error?.message ?? "ไม่พบรายการที่สร้าง"}`,
        );
        return;
      }

      setTransactions((current) => [
        mapTransaction(data as TransactionRow),
        ...current,
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

  async function deleteTransaction(id: string) {
    if (!isAdmin) {
      openLoginModal();
      return;
    }

    const transaction = transactions.find((item) => item.id === id);

    if (!transaction) return;

    const confirmed = window.confirm(
      `ลบรายการ "${transaction.desc}" ใช่หรือไม่?\n\nการดำเนินการนี้ไม่สามารถย้อนกลับได้`,
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("ลบรายการไม่สำเร็จ:", error);
      alert(`ลบรายการไม่สำเร็จ\n${error.message}`);
      return;
    }

    setTransactions((current) =>
      current.filter((item) => item.id !== id),
    );
  }

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2200);
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
      const downloadUrl = `/api/qr-download?fileId=${encodeURIComponent(
        driveFileId,
      )}`;
      window.location.assign(downloadUrl);
      return;
    }

    // กรณี QR ไม่ได้มาจาก Google Drive ให้ใช้วิธีดาวน์โหลดปกติ
    void (async () => {
      try {
        const response = await fetch(imageUrl, { mode: "cors" });

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

        window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
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

    const { error } = await supabase.from("settings").upsert(
      {
        key: "qr_url",
        value: cleanQrUrl || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );

    if (error) {
      console.error("บันทึก QR ไม่สำเร็จ:", error);
      alert(`บันทึก QR ไม่สำเร็จ\n${error.message}`);
      return;
    }

    setQrUrl(cleanQrUrl);
    closeQrModal();
  }

  if (!isReady) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-2)",
        }}
      >
        กำลังโหลดข้อมูล...
      </main>
    );
  }

  return (
    <>
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <nav className="navbar">
        <button
          type="button"
          className="nav-brand"
          onClick={() => router.push("/")}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          OomBam Blossom FC
        </button>

        <div className="nav-right">
          {isAdmin ? (
            <>
              <span className="admin-badge">👤 Admin</span>

              <button
                type="button"
                className="btn-nav btn-logout"
                onClick={() => void doLogout()}
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-nav btn-login"
              onClick={openLoginModal}
            >
              🔐 Admin Login
            </button>
          )}
        </div>
      </nav>

      <div id="app">
        {selectedEvent ? (
          <main className="view active">
            <div className="detail-hero section">
              <button
                type="button"
                className="back-btn"
                onClick={() => router.push("/")}
              >
                ← กลับหน้าหลัก
              </button>

              <h2>{selectedEvent.name}</h2>

              {selectedEvent.desc && (
                <p
                  style={{
                    color: "var(--text-2)",
                    marginTop: "8px",
                  }}
                >
                  {selectedEvent.desc}
                </p>
              )}

              <div className="detail-stats">
                <div className="detail-stat">
                  <div className="detail-stat-label">เงินเข้า</div>
                  <div
                    className="detail-stat-val"
                    style={{ color: "var(--income)" }}
                  >
                    ฿{formatMoney(selectedEventStats.income)}
                  </div>
                </div>

                <div style={{ color: "var(--border)" }}>|</div>

                <div className="detail-stat">
                  <div className="detail-stat-label">เงินออก</div>
                  <div
                    className="detail-stat-val"
                    style={{ color: "var(--expense)" }}
                  >
                    ฿{formatMoney(selectedEventStats.expense)}
                  </div>
                </div>

                <div style={{ color: "var(--border)" }}>|</div>

                <div className="detail-stat">
                  <div className="detail-stat-label">ยอดสุทธิ</div>
                  <div
                    className="detail-stat-val"
                    style={{
                      color:
                        selectedEventStats.balance >= 0
                          ? "var(--income)"
                          : "var(--expense)",
                    }}
                  >
                    {selectedEventStats.balance < 0 ? "-" : ""}฿
                    {formatMoney(Math.abs(selectedEventStats.balance))}
                  </div>
                </div>

                <div style={{ color: "var(--border)" }}>|</div>

                <div className="detail-stat">
                  <div className="detail-stat-label">จำนวนรายการ</div>
                  <div
                    className="detail-stat-val"
                    style={{ color: "var(--accent)" }}
                  >
                    {selectedEventStats.count}
                  </div>
                </div>
              </div>
            </div>

            <section className="section">
              <div className="section-header">
                <div className="section-title">รายการทั้งหมด</div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <select
                    className="form-control"
                    value={transactionFilter}
                    onChange={(event) =>
                      setTransactionFilter(
                        event.target.value as "" | "income" | "expense",
                      )
                    }
                    style={{
                      width: "auto",
                      padding: "8px 14px",
                      fontSize: ".85rem",
                    }}
                  >
                    <option value="">ทุกประเภท</option>
                    <option value="income">เงินเข้า</option>
                    <option value="expense">เงินออก</option>
                  </select>

                  {isAdmin && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={openCreateTransactionModal}
                    >
                      ➕ เพิ่มรายการ
                    </button>
                  )}
                </div>
              </div>

              {filteredTransactions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🧾</div>
                  <p>
                    ยังไม่มีรายการ
                    <br />
                    {transactionFilter
                      ? "ไม่พบรายการในประเภทนี้"
                      : "รายการเงินเข้าและเงินออกจะแสดงที่นี่"}
                  </p>
                </div>
              ) : (
                <div className="tx-list">
                  {filteredTransactions.map((transaction) => (
                    <article
                      key={transaction.id}
                      className={`tx-card tx-${transaction.type}`}
                    >
                      <div className="tx-top">
                        <div className="tx-info">
                          <div className="tx-desc">{transaction.desc}</div>
                          <div className="tx-date">
                            {formatDate(transaction.date)}
                            {transaction.time ? ` • ${transaction.time.slice(0, 5)}` : ""}
                          </div>
                        </div>

                        <div className="tx-amount">
                          {transaction.type === "income" ? "+" : "-"}฿
                          {formatMoney(transaction.amount)}
                        </div>
                      </div>

                      <div className="tx-chips">
                        <span
                          className={`chip ${transaction.type === "income"
                            ? "chip-income"
                            : "chip-expense"
                            }`}
                        >
                          {transaction.type === "income"
                            ? "💰 เงินเข้า"
                            : "💸 เงินออก"}
                        </span>

                        {transaction.note && (
                          <span className="chip chip-file">
                            📝 {transaction.note}
                          </span>
                        )}

                        {transaction.attachments.map((attachment) =>
                          isImageAttachment(attachment) ? (
                            <button
                              key={attachment.id}
                              type="button"
                              className="chip chip-file transaction-attachment-chip"
                              onClick={() => setPreviewAttachment(attachment)}
                              title="ดูภาพตัวอย่าง"
                            >
                              🖼️ {attachment.name}
                            </button>
                          ) : (
                            <a
                              key={attachment.id}
                              className="chip chip-file transaction-attachment-chip"
                              href={getAttachmentDownloadUrl(attachment)}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              title="ดาวน์โหลดเอกสาร"
                            >
                              📄 {attachment.name}
                            </a>
                          ),
                        )}

                        {isAdmin && (
                          <>
                            <button
                              type="button"
                              className="chip chip-file"
                              onClick={() =>
                                openEditTransactionModal(transaction)
                              }
                            >
                              ✏️ แก้ไข
                            </button>

                            <button
                              type="button"
                              className="chip chip-expense"
                              onClick={() =>
                                void deleteTransaction(transaction.id)
                              }
                            >
                              🗑️ ลบ
                            </button>
                          </>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="section">
              <div className="section-header">
                <div className="section-title">รูปภาพและตารางงาน</div>

                {isAdmin && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => openEditEventModal(selectedEvent)}
                  >
                    ⚙️ ตั้งค่าลิงก์สื่อ
                  </button>
                )}
              </div>

              <div className="event-media-grid">
                <div className="event-media-col event-media-gallery">
                  <div className="event-media-heading">
                    <div>
                      <div className="event-media-title">📸 รูปภาพจากงาน</div>
                    </div>

                    {selectedEventImages.length > 0 && (
                      <div className="slideshow-count">
                        {selectedImageIndex + 1} / {selectedEventImages.length}
                      </div>
                    )}
                  </div>

                  {isLoadingEventImages ? (
                    <div className="slideshow-empty slideshow-loading">
                      <div className="slideshow-spinner" />
                      <span>กำลังโหลดรูปจาก Google Drive...</span>
                    </div>
                  ) : eventImagesError ? (
                    <div className="slideshow-empty">
                      <span className="slideshow-empty-icon">⚠️</span>
                      <span>{eventImagesError}</span>
                    </div>
                  ) : selectedEventImages.length > 0 ? (
                    <div className="slideshow-wrap">
                      <div className="slideshow-main">
                        <div className="slideshow-image-backdrop" />

                        <img
                          src={selectedEventImages[selectedImageIndex].imageUrl}
                          alt={
                            selectedEventImages[selectedImageIndex]?.name ??
                            `Event image ${selectedImageIndex + 1}`
                          }
                          className="slideshow-image"
                          key={selectedEventImages[selectedImageIndex].id}
                          onError={(event) => {
                            event.currentTarget.style.opacity = "0.35";
                          }}
                        />

                        <div className="slideshow-top-gradient" />
                        <div className="slideshow-bottom-gradient" />



                        {selectedEventImages.length > 1 && (
                          <>
                            <button
                              type="button"
                              className="slideshow-arrow prev"
                              aria-label="รูปก่อนหน้า"
                              onClick={() =>
                                setSelectedImageIndex((current) =>
                                  current === 0
                                    ? selectedEventImages.length - 1
                                    : current - 1,
                                )
                              }
                            >
                              ‹
                            </button>

                            <button
                              type="button"
                              className="slideshow-arrow next"
                              aria-label="รูปถัดไป"
                              onClick={() =>
                                setSelectedImageIndex((current) =>
                                  current === selectedEventImages.length - 1
                                    ? 0
                                    : current + 1,
                                )
                              }
                            >
                              ›
                            </button>
                          </>
                        )}
                      </div>

                      {selectedEventImages.length > 1 && (
                        <div className="slideshow-thumbs-wrap">


                          <div className="slideshow-thumbs">
                            {selectedEventImages.map((image, index) => (
                              <button
                                type="button"
                                key={`${image.id}-${index}`}
                                className={`slideshow-thumb-btn ${index === selectedImageIndex ? "active" : ""
                                  }`}
                                onClick={() => setSelectedImageIndex(index)}
                                aria-label={`เลือกรูปที่ ${index + 1}`}
                                aria-current={
                                  index === selectedImageIndex
                                    ? "true"
                                    : undefined
                                }
                              >
                                <img
                                  className="slideshow-thumb"
                                  src={image.imageUrl}
                                  alt={`Thumbnail ${index + 1}`}
                                />
                                <span className="slideshow-thumb-number">
                                  {index + 1}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="slideshow-empty">
                      <span className="slideshow-empty-icon">🖼️</span>
                      <span>ยังไม่มีรูปภาพในโฟลเดอร์ Google Drive นี้</span>
                    </div>
                  )}
                </div>

                <div className="event-media-col event-schedule-card">
                  <div className="event-media-heading">
                    <div>
                      <div className="event-media-title">📅 ตารางงาน</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="schedule-image-frame"
                    onClick={() => setIsSchedulePreviewOpen(true)}
                    aria-label="เปิดตารางงานแบบขยาย"
                    style={{ cursor: "zoom-in" }}
                  >
                    <img
                      className="event-media-img"
                      src={getScheduleImageUrl(selectedEvent.scheduleUrl)}
                      alt="Schedule"
                    />
                  </button>
                </div>
              </div>

            </section>
          </main>
        ) : (
          <main className="view active">
            <div style={{ height: "40px" }} />

            <section className="section">
              <div className="stats-grid">
                <div className="stat-card stat-income">
                  <div className="stat-icon stat-icon-image"><img src="/icons/income.png" alt="เงินเข้า" /></div>
                  <div className="stat-label">รวมเงินเข้าทั้งหมด</div>
                  <div className="stat-value">
                    ฿{formatMoney(globalStats.income)}
                  </div>
                </div>

                <div className="stat-card stat-expense">
                  <div className="stat-icon stat-icon-image"><img src="/icons/expense.png" alt="เงินออก" /></div>
                  <div className="stat-label">รวมเงินออกทั้งหมด</div>
                  <div className="stat-value">
                    ฿{formatMoney(globalStats.expense)}
                  </div>
                </div>

                <div
                  className={`stat-card stat-balance${globalStats.balance < 0 ? " negative" : ""
                    }`}
                >
                  <div className="stat-icon stat-icon-image"><img src="/icons/balance.png" alt="ยอดคงเหลือสุทธิ" /></div>
                  <div className="stat-label">ยอดคงเหลือสุทธิ</div>
                  <div className="stat-value">
                    {globalStats.balance < 0 ? "-" : ""}฿
                    {formatMoney(Math.abs(globalStats.balance))}
                  </div>
                </div>
              </div>

              <div className="section-header">
                <div className="section-title">สรุป Event ทั้งหมด</div>

                {isAdmin && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openCreateEventModal}
                  >
                    ➕ เพิ่ม Event
                  </button>
                )}
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ชื่อ Event</th>
                      <th>รายการ</th>
                      <th>เงินเข้า (฿)</th>
                      <th>เงินออก (฿)</th>
                      <th>ยอดสุทธิ (฿)</th>
                      {isAdmin && <th>จัดการ</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {events.length === 0 ? (
                      <tr>
                        <td colSpan={isAdmin ? 6 : 5}>
                          <div className="empty-state">
                            <div className="empty-icon">📂</div>
                            <p>
                              ยังไม่มี Event
                              <br />
                              {isAdmin
                                ? 'คลิก "เพิ่ม Event" เพื่อเริ่มต้น'
                                : "รอข้อมูลจาก Admin"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      events.map((event) => {
                        const eventTransactions = transactions.filter(
                          (transaction) => transaction.eventId === event.id,
                        );

                        const income = eventTransactions
                          .filter(
                            (transaction) => transaction.type === "income",
                          )
                          .reduce(
                            (sum, transaction) =>
                              sum + Number(transaction.amount),
                            0,
                          );

                        const expense = eventTransactions
                          .filter(
                            (transaction) => transaction.type === "expense",
                          )
                          .reduce(
                            (sum, transaction) =>
                              sum + Number(transaction.amount),
                            0,
                          );

                        const balance = income - expense;

                        return (
                          <tr
                            key={event.id}
                            onClick={() => openEventDetail(event.id)}
                          >
                            <td className="td-event-name">
                              {event.name}

                              {event.desc && (
                                <div
                                  style={{
                                    fontSize: ".76rem",
                                    color: "var(--text-3)",
                                    marginTop: "2px",
                                  }}
                                >
                                  {event.desc}
                                </div>
                              )}
                            </td>

                            <td>
                              <span className="chip-count">
                                {eventTransactions.length} รายการ
                              </span>
                            </td>

                            <td className="td-income">
                              ฿{formatMoney(income)}
                            </td>

                            <td className="td-expense">
                              ฿{formatMoney(expense)}
                            </td>

                            <td
                              className={`td-balance ${balance >= 0 ? "pos" : "neg"
                                }`}
                            >
                              {balance < 0 ? "-" : ""}฿
                              {formatMoney(Math.abs(balance))}
                            </td>

                            {isAdmin && (
                              <td
                                onClick={(eventObject) =>
                                  eventObject.stopPropagation()
                                }
                              >
                                <div className="td-actions">
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-sm"
                                    onClick={() =>
                                      openEditEventModal(event)
                                    }
                                  >
                                    ✏️ แก้ไข
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      void deleteEvent(event.id)
                                    }
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="donate-section">
              <div className="donate-card">
                {isAdmin && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm donate-admin-btn show"
                    onClick={openQrModal}
                  >
                    ⚙️ ตั้งค่า QR
                  </button>
                )}

                <div className="donate-qr-wrap">
                  <div className="donate-qr-frame">
                    {qrUrl ? (
                      <img src={getQrImageUrl(qrUrl)} alt="QR Code โอนเงิน" />
                    ) : (
                      <div className="donate-qr-placeholder">
                        <span className="qr-icon">📱</span>
                        <span>
                          QR Code
                          <br />
                          ยังไม่ได้ตั้งค่า
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="donate-qr-badge">📲 Scan to Pay</div>
                </div>

                <div className="donate-text">
                  <div className="donate-eyebrow">ร่วมสนับสนุน</div>

                  <div className="donate-title">
                    ร่วมเป็นส่วนหนึ่งของ
                    <br />
                    <span>OomBam Blossom FC</span>
                  </div>

                  <p className="donate-desc">
                    ทุกการสนับสนุนของคุณจะช่วยให้โปรเจคนี้เดินหน้าต่อไปได้
                    สแกน QR Code หรือโอนเงินผ่านช่องทางด้านล่างได้เลย
                    ขอบคุณทุกแรงใจที่มอบให้ 🌸
                  </p>

                  <div
                    style={{
                      margin: "18px 0 20px",
                      padding: "14px 16px",
                      borderRadius: "14px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: ".78rem",
                        color: "var(--text-3)",
                        marginBottom: "8px",
                      }}
                    >
                      ข้อมูลสำหรับโอนเงิน
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gap: "5px",
                        fontSize: ".88rem",
                      }}
                    >
                      <div>
                        <span style={{ color: "var(--text-3)" }}>ธนาคาร: </span>
                        <strong>{bankName || "—"}</strong>
                      </div>

                      <div>
                        <span style={{ color: "var(--text-3)" }}>เลขที่บัญชี: </span>
                        <strong>{bankAccountNumber || "—"}</strong>
                      </div>

                      <div>
                        <span style={{ color: "var(--text-3)" }}>ชื่อบัญชี: </span>
                        <strong>{bankAccountName || "—"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="donate-methods">
                    <button
                      type="button"
                      className="donate-method donate-method-button donate-method-save"
                      onClick={() => void saveQrImage()}
                    >
                      💾 Save QR
                    </button>

                    <button
                      type="button"
                      className="donate-method donate-method-button donate-method-copy"
                      onClick={() => void copyBankAccount()}
                    >
                      📋 คัดลอกหมายเลขบัญชี
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
      </div>

      {isEventModalOpen && (
        <div
          className="modal-overlay open"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeEventModal();
            }
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                {editingEventId ? "✏️ แก้ไข Event" : "➕ สร้าง Event ใหม่"}
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeEventModal}
              >
                ✕
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">ชื่อ Event *</label>
              <input
                type="text"
                className="form-control"
                placeholder="เช่น งานปีใหม่ 2025, โปรเจกต์ A..."
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                รายละเอียด (ไม่บังคับ)
              </label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="รายละเอียดเพิ่มเติม..."
                value={eventDesc}
                onChange={(event) => setEventDesc(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                🖼️ ลิงก์โฟลเดอร์รูปภาพ Google Drive
              </label>
              <input
                type="url"
                className="form-control"
                placeholder="https://drive.google.com/drive/folders/..."
                value={imageFolderUrl}
                onChange={(event) => setImageFolderUrl(event.target.value)}
              />
              <div className="drive-hint">
                📌 ใส่ลิงก์โฟลเดอร์เพียง 1 ลิงก์ ระบบจะดึงรูปทั้งหมดในโฟลเดอร์
                <br />
                🔓 ต้องตั้งโฟลเดอร์เป็น “ทุกคนที่มีลิงก์ → ผู้ดู”
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                ลิงก์ภาพตารางงาน (Google Drive - ไม่บังคับ)
              </label>
              <input
                type="url"
                className="form-control"
                placeholder="https://drive.google.com/file/d/..."
                value={scheduleUrl}
                onChange={(event) => setScheduleUrl(event.target.value)}
              />
              <div
                className="drive-hint"
                style={{ marginTop: "8px" }}
              >
                📎 ใส่ลิงก์ภาพตารางงาน หรือเว้นว่างเพื่อใช้ภาพเริ่มต้น
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeEventModal}
              >
                ยกเลิก
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => void saveEvent()}
              >
                💾 บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {isTransactionModalOpen && (
        <div
          className="modal-overlay open"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeTransactionModal();
            }
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                {editingTransactionId
                  ? "✏️ แก้ไขรายการ"
                  : "➕ เพิ่มรายการ"}
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeTransactionModal}
              >
                ✕
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">วันที่ *</label>
                <input
                  type="date"
                  className="form-control"
                  value={transactionDate}
                  onChange={(event) =>
                    setTransactionDate(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">เวลา</label>
                <input
                  type="time"
                  step="1"
                  className="form-control"
                  value={transactionTime}
                  onChange={(event) =>
                    setTransactionTime(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">ประเภท *</label>
                <select
                  className="form-control"
                  value={transactionType}
                  onChange={(event) =>
                    setTransactionType(
                      event.target.value as "income" | "expense",
                    )
                  }
                >
                  <option value="income">เงินเข้า</option>
                  <option value="expense">เงินออก</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">รายละเอียด *</label>
              <input
                type="text"
                className="form-control"
                placeholder="เช่น เงินสนับสนุน, ค่าเดินทาง, ค่าอาหาร..."
                value={transactionDesc}
                onChange={(event) =>
                  setTransactionDesc(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                จำนวนเงิน (฿) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`form-control ${transactionType === "income"
                  ? "input-type-income"
                  : "input-type-expense"
                  }`}
                placeholder="0.00"
                value={transactionAmount}
                onChange={(event) =>
                  setTransactionAmount(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                หมายเหตุ (ไม่บังคับ)
              </label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="รายละเอียดเพิ่มเติม..."
                value={transactionNote}
                onChange={(event) =>
                  setTransactionNote(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">📎 ไฟล์ประกอบรายการ</label>

              <div className="transaction-upload-grid">
                <label className="transaction-upload-card transaction-upload-slip">
                  <span className="transaction-upload-icon">🧾</span>
                  <span className="transaction-upload-title">อัปโหลดสลิป</span>
                  <span className="transaction-upload-subtitle">
                    ระบบจะอ่านธนาคาร ประเภท ผู้โอน ผู้รับ วันที่ เวลา และจำนวนเงิน
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(event) => {
                      void handleSlipFileChange(event.target.files?.[0] ?? null);
                      event.currentTarget.value = "";
                    }}
                    disabled={
                      isUploadingAttachment ||
                      isReadingSlip ||
                      (getAttachmentSlotCount() >= 5 && !transactionSlipFile)
                    }
                    hidden
                  />
                </label>

                <label className="transaction-upload-card transaction-upload-document">
                  <span className="transaction-upload-icon">📎</span>
                  <span className="transaction-upload-title">อัปโหลดเอกสาร</span>
                  <span className="transaction-upload-subtitle">
                    PDF, JPG, PNG, WEBP, GIF
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,.pdf"
                    multiple
                    onChange={(event) => {
                      handleTransactionDocumentChange(event.target.files);
                      event.currentTarget.value = "";
                    }}
                    disabled={
                      isUploadingAttachment ||
                      isReadingSlip ||
                      getAttachmentSlotCount() >= 5
                    }
                    hidden
                  />
                </label>
              </div>

              {isReadingSlip && (
                <div className="drive-hint slip-reading-status">
                  🔎 กำลังอ่านข้อมูลจากสลิป...
                </div>
              )}

              {slipError && (
                <div className="error-msg show">{slipError}</div>
              )}

              {transactionSlipFile && (
                <div className="transaction-file-row transaction-slip-file-row">
                  <div className="transaction-file-main">
                    <span className="transaction-file-name">
                      🧾 {transactionSlipFile.name}
                    </span>

                    {transactionSlipData && (
                      <div className="transaction-slip-data-grid">
                        <span>
                          <strong>ธนาคาร:</strong>{" "}
                          {transactionSlipData.bankName || "ไม่พบข้อมูล"}
                        </span>
                        <span>
                          <strong>ประเภท:</strong>{" "}
                          {transactionSlipData.transactionType === "income"
                            ? "เงินเข้า"
                            : transactionSlipData.transactionType === "expense"
                              ? "เงินออก"
                              : "ไม่ระบุ"}
                        </span>
                        <span>
                          <strong>ผู้โอน:</strong>{" "}
                          {transactionSlipData.payerName || "ไม่พบข้อมูล"}
                        </span>
                        <span>
                          <strong>ผู้รับ:</strong>{" "}
                          {transactionSlipData.payeeName || "ไม่พบข้อมูล"}
                        </span>
                        <span>
                          <strong>วันที่:</strong>{" "}
                          {transactionSlipData.transferDate || "ไม่พบข้อมูล"}
                        </span>
                        <span>
                          <strong>เวลา:</strong>{" "}
                          {transactionSlipData.transferTime || "ไม่พบข้อมูล"}
                        </span>
                        <span>
                          <strong>จำนวนเงิน:</strong>{" "}
                          {typeof transactionSlipData.amount === "number"
                            ? `฿${formatMoney(transactionSlipData.amount)}`
                            : "ไม่พบข้อมูล"}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={removeTransactionSlip}
                    disabled={isUploadingAttachment}
                  >
                    ลบสลิป
                  </button>
                </div>
              )}

              {transactionAttachments.length > 0 && (
                <div className="transaction-selected-list">
                  {transactionAttachments.map((file, index) => (
                    <div
                      key={`${file.name}-${file.lastModified}-${index}`}
                      className="transaction-file-row"
                    >
                      <span className="transaction-file-name">
                        📄 {file.name}
                      </span>

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => removeNewTransactionAttachment(index)}
                        disabled={isUploadingAttachment}
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {transactionExistingAttachments.length > 0 && (
                <div className="transaction-existing-list">
                  {transactionExistingAttachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="transaction-file-row transaction-file-existing"
                    >
                      <span className="transaction-file-name">
                        {attachment.category === "slip"
                          ? "🧾"
                          : isImageAttachment(attachment)
                            ? "🖼️"
                            : "📄"}{" "}
                        {attachment.name}
                      </span>

                      {isImageAttachment(attachment) && (
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => setPreviewAttachment(attachment)}
                        >
                          ดูตัวอย่าง
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {getAttachmentSlotCount() === 0 && (
                <span className="transaction-file-hint">
                  แนบได้สูงสุด 5 ไฟล์ต่อรายการ • สลิป 1 ไฟล์ + เอกสารหลายไฟล์ • ไฟล์ละไม่เกิน 4 MB
                </span>
              )}

              {getAttachmentSlotCount() >= 5 && (
                <span className="transaction-file-hint">
                  ✓ แนบครบ 5 ไฟล์แล้ว
                </span>
              )}
            </div>

            {isUploadingAttachment && (
              <div className="drive-hint">
                ⏳ กำลังอัปโหลดไฟล์ {attachmentUploadProgress + 1} /{" "}
                {(
                  transactionAttachments.length +
                  (transactionSlipFile ? 1 : 0)
                )} ไป Google Drive...
              </div>
            )}

            {attachmentError && (
              <div className="error-msg show">{attachmentError}</div>
            )}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeTransactionModal}
              >
                ยกเลิก
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => void saveTransaction()}
              >
                💾 บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <div
          className="modal-overlay open"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLoginModal();
            }
          }}
        >
          <div className="modal login-modal">
            <div className="login-icon">🔐</div>

            <div
              className="modal-header"
              style={{
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <div
                className="modal-title"
                style={{ fontSize: "1.3rem" }}
              >
                Admin Login
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">อีเมล</label>
              <input
                type="email"
                className="form-control"
                placeholder="admin@example.com"
                value={loginEmail}
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                  setLoginError("");
                }}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">รหัสผ่าน</label>
              <input
                type="password"
                className="form-control"
                placeholder="ใส่รหัสผ่าน..."
                value={loginPassword}
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                  setLoginError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    void doLogin();
                  }
                }}
              />

              {loginError && (
                <div className="error-msg show">
                  {loginError}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeLoginModal}
              >
                ยกเลิก
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => void doLogin()}
              >
                🔓 เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      )}

      {isSchedulePreviewOpen && (
        <div
          className="slip-viewer-overlay open"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsSchedulePreviewOpen(false);
            }
          }}
        >
          <div
            className="slip-viewer-content"
            style={{
              maxWidth: "96vw",
              maxHeight: "96vh",
              overflow: "auto",
              padding: "8px",
              borderRadius: "16px",
            }}
          >
            <button
              type="button"
              className="slip-close schedule-preview-close"
              onClick={() => setIsSchedulePreviewOpen(false)}
              aria-label="ปิดตัวอย่างตารางงาน"
            >
              ✕
            </button>

            <img
              src={getScheduleImageUrl(selectedEvent?.scheduleUrl ?? "")}
              alt="Schedule preview"
              style={{
                maxWidth: "92vw",
                maxHeight: "92vh",
                width: "auto",
                height: "auto",
                cursor: "zoom-out",
              }}
              onClick={() => setIsSchedulePreviewOpen(false)}
            />
          </div>
        </div>
      )}

      {previewAttachment && isImageAttachment(previewAttachment) && (
        <div
          className="slip-viewer-overlay open transaction-image-preview-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewAttachment(null);
            }
          }}
        >
          <div className="transaction-image-preview">
            <button
              type="button"
              className="slip-close transaction-preview-close"
              onClick={() => setPreviewAttachment(null)}
              aria-label="ปิดตัวอย่างรูป"
            >
              ✕
            </button>

            <img
              src={getAttachmentImagePreviewUrl(previewAttachment)}
              alt={previewAttachment.name}
            />

            <div className="transaction-preview-caption">
              {previewAttachment.name}
            </div>
          </div>
        </div>
      )}

      {isQrModalOpen && (
        <div
          className="modal-overlay open"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeQrModal();
            }
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                ⚙️ ตั้งค่า QR Code
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeQrModal}
              >
                ✕
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">
                ลิงก์ภาพ QR Code
              </label>

              <input
                type="url"
                className="form-control"
                placeholder="วางลิงก์ Google Drive หรือ https://..."
                value={qrInput}
                onChange={(event) =>
                  setQrInput(event.target.value)
                }
              />

              <div
                className="drive-hint"
                style={{ marginTop: "8px" }}
              >
                📎 วางลิงก์แชร์ Google Drive ของรูป QR ได้เลย
                <br />
                🔓 ตั้งสิทธิ์ไฟล์เป็น “ทุกคนที่มีลิงก์ → ผู้ดู”
                <br />
                ☁️ ระบบจะบันทึกลิงก์ไว้ใน Supabase และแปลงลิงก์ Drive ให้อัตโนมัติ
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeQrModal}
              >
                ยกเลิก
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={saveQr}
              >
                💾 บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div id="toast-container">
          <div className="toast toast-success">
            ✓ {toastMessage}
          </div>
        </div>
      )}
    </>
  );
}
