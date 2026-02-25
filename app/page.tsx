"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import AppDownloadCTA from "./components/AppDownloadCTA";
import LogoImage from "./Images/logo.png";
import AiIcon from "./Images/Icon.jpg";

/* ─── Icons ───────────────────────────────────────────── */

function UploadIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" />
    </svg>
  );
}

function FlipCameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
      <path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
      <polyline points="16 3 19 6 16 9" />
      <polyline points="8 21 5 18 8 15" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function ImagePlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 48 48" fill="currentColor">
      <path d="M29.45 6V9H9Q9 9 9 9Q9 9 9 9V39Q9 39 9 39Q9 39 9 39H39Q39 39 39 39Q39 39 39 39V18.6H42V39Q42 40.2 41.1 41.1Q40.2 42 39 42H9Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6ZM38 6V10.05H42.05V13.05H38V17.1H35V13.05H30.95V10.05H35V6ZM12 33.9H36L28.8 24.3L22.45 32.65L17.75 26.45ZM9 9V14.55V18.6V39Q9 39 9 39Q9 39 9 39Q9 39 9 39Q9 39 9 39V9Q9 9 9 9Q9 9 9 9Z"/>
    </svg>
  );
}

/* ─── Chat Types ──────────────────────────────────────── */

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: string[];
};

const QUICK_QUESTIONS = [
  "How do I look?",
  "What should I change?",
  "How do I style this?",
  "What shoes would go with this?",
];

const FIRST_PROMO_AFTER = 1;   // show modal after 1st exchange
const REPROMO_AFTER = 3;       // reshow 3 exchanges after dismiss
const MAX_FREE_EXCHANGES = 3;  // disable chat after this many

/* ─── Markdown Renderer ─────────────────────────────── */

function renderMarkdown(text: string) {
  // Split by newlines first, then process inline formatting
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    // Process inline markdown: **bold**, *italic*, [text](url)
    const parts: (string | React.ReactElement)[] = [];
    // Regex to match **bold**, *italic*, and [text](url)
    const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      // Add text before this match
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }

      if (match[2]) {
        // **bold**
        parts.push(<strong key={`${lineIdx}-${match.index}`}>{match[2]}</strong>);
      } else if (match[3]) {
        // *italic*
        parts.push(<em key={`${lineIdx}-${match.index}`}>{match[3]}</em>);
      } else if (match[4] && match[5]) {
        // [text](url)
        parts.push(
          <a
            key={`${lineIdx}-${match.index}`}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--clr-accent)", textDecoration: "underline" }}
          >
            {match[4]}
          </a>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    return (
      <span key={lineIdx}>
        {parts.length > 0 ? parts : line}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

/* ─── Camera Modal ────────────────────────────────────── */

function CameraModal({
  onCapture,
  onClose,
}: {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async (facing: "user" | "environment") => {
    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    setIsReady(false);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsReady(true);
        };
      }
    } catch {
      setError("Unable to access camera. Please allow camera permissions and try again.");
    }
  }, []);

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFlip = () => {
    const next = facingMode === "user" ? "environment" : "user";
    setFacingMode(next);
    startCamera(next);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mirror the image if using front camera
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

    // Stop stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }

    onCapture(dataUrl);
  };

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Hidden canvas for snapshot */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {error ? (
        <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
          <p style={{ marginBottom: "1.5rem", fontSize: "15px", lineHeight: 1.6 }}>{error}</p>
          <button
            onClick={handleClose}
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "12px",
              padding: "12px 28px",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Go back
          </button>
        </div>
      ) : (
        <>
          {/* Video feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: facingMode === "user" ? "scaleX(-1)" : "none",
            }}
          />

          {/* Loading overlay */}
          {!isReady && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.7)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "3px solid rgba(255,255,255,0.2)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Top bar — close button */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "env(safe-area-inset-top, 12px) 16px 12px 16px",
              display: "flex",
              justifyContent: "flex-start",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
            }}
          >
            <button
              onClick={handleClose}
              aria-label="Close camera"
              style={{
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(8px)",
                border: "none",
                borderRadius: "50%",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                marginTop: 8,
              }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Bottom controls */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: "max(env(safe-area-inset-bottom, 20px), 20px)",
              paddingTop: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "36px",
              background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
            }}
          >
            {/* Flip camera */}
            <button
              onClick={handleFlip}
              aria-label="Switch camera"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "50%",
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <FlipCameraIcon />
            </button>

            {/* Shutter button */}
            <button
              onClick={handleCapture}
              disabled={!isReady}
              aria-label="Take photo"
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "4px solid #fff",
                background: isReady ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                cursor: isReady ? "pointer" : "default",
                position: "relative",
                transition: "transform 0.15s ease",
              }}
              onPointerDown={(e) => {
                if (isReady) (e.currentTarget.style.transform = "scale(0.9)");
              }}
              onPointerUp={(e) => {
                (e.currentTarget.style.transform = "scale(1)");
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 6,
                  borderRadius: "50%",
                  background: "#fff",
                  opacity: isReady ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              />
            </button>

            {/* Spacer to balance layout */}
            <div style={{ width: 50, height: 50 }} />
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────── */

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [showPromo, setShowPromo] = useState(false);
  const [dismissedAtCount, setDismissedAtCount] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const promoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const keepChatRef = useRef(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDismissPromo = useCallback(() => {
    setShowPromo(false);
    setDismissedAtCount(exchangeCount);
  }, [exchangeCount]);

  const resetAll = useCallback(() => {
    setUploadedFile(null);
    setPendingImages([]);
    setMessages([]);
    setExchangeCount(0);
    setQuestion("");
    setShowPromo(false);
    setShowChoiceModal(false);
    setShowCamera(false);
    if (promoTimeoutRef.current) {
      clearTimeout(promoTimeoutRef.current);
      promoTimeoutRef.current = null;
    }
  }, []);

  const chatDisabled = exchangeCount >= MAX_FREE_EXCHANGES;

  const askQuestion = useCallback(async (q: string) => {
    if (!uploadedFile || !q.trim() || isAsking || chatDisabled) return;

    // Trigger pop-up immediately if this is the second question being sent
    if (exchangeCount === 1) {
      if (promoTimeoutRef.current) {
        clearTimeout(promoTimeoutRef.current);
        promoTimeoutRef.current = null;
      }
      setShowPromo(true);
    }

    // Attach current pending images to this message
    const imagesForThisMessage = pendingImages.length > 0 ? [...pendingImages] : undefined;
    setPendingImages([]);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: q.trim(),
      images: imagesForThisMessage,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsAsking(true);
    setQuestion("");

    // Build history from existing messages (include images for context)
    const history = messages
      .map((m) => ({ role: m.role, content: m.content, images: m.images }));

    // Collect all images to send: the images from this message
    const allImages = imagesForThisMessage || [uploadedFile];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: allImages,
          question: q.trim(),
          history: history.length > 0 ? history : undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Something went wrong" }));
        const errMsg: ChatMessage = {
          id: Date.now().toString() + "_err",
          role: "assistant",
          content: err.error || "The fashion gods are unavailable. Try again! 😅",
        };
        setMessages((prev) => [...prev, errMsg]);
      } else {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: Date.now().toString() + "_ai",
          role: "assistant",
          content: data.reply,
        };
        setMessages((prev) => [...prev, aiMsg]);

        const newCount = exchangeCount + 1;
        setExchangeCount(newCount);

        // Show app download modal after 5 seconds for the first reply
        if (newCount === FIRST_PROMO_AFTER) {
          promoTimeoutRef.current = setTimeout(() => {
            setShowPromo(true);
            promoTimeoutRef.current = null;
          }, 5000);
        } else if (dismissedAtCount !== null && newCount >= dismissedAtCount + REPROMO_AFTER) {
          // Re-promo logic for subsequent exchanges
          setTimeout(() => setShowPromo(true), 600);
        }
      }
    } catch {
      const errMsg: ChatMessage = {
        id: Date.now().toString() + "_err",
        role: "assistant",
        content: "Network error — even the WiFi doesn't want to cooperate. 💀",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsAsking(false);
    }
  }, [uploadedFile, pendingImages, isAsking, messages, exchangeCount, dismissedAtCount, chatDisabled]);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target?.result as string;
        if (!uploadedFile && !keepChatRef.current) {
          // First ever image — set as primary and reset chat
          setUploadedFile(base64Data);
          setPendingImages([base64Data]);
          setMessages([]);
          setExchangeCount(0);
        } else {
          // Additional image — append to pending
          setUploadedFile((prev) => prev || base64Data);
          setPendingImages((prev) => [...prev, base64Data]);
          if (!keepChatRef.current) {
            setMessages([]);
            setExchangeCount(0);
          }
        }
        keepChatRef.current = false;
      };
      reader.readAsDataURL(file);
    }
  }, [uploadedFile]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleCameraClick = () => {
    if (navigator.mediaDevices && "getUserMedia" in navigator.mediaDevices) {
      setShowCamera(true);
    } else {
      cameraInputRef.current?.click();
    }
  };

  const handleCameraCapture = (dataUrl: string) => {
    setShowCamera(false);
    if (!uploadedFile && !keepChatRef.current) {
      setUploadedFile(dataUrl);
      setPendingImages([dataUrl]);
      setMessages([]);
      setExchangeCount(0);
    } else {
      setUploadedFile((prev) => prev || dataUrl);
      setPendingImages((prev) => [...prev, dataUrl]);
      if (!keepChatRef.current) {
        setMessages([]);
        setExchangeCount(0);
      }
    }
    keepChatRef.current = false;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so the same file can be re-selected next time
    e.target.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--clr-bg)] font-[var(--font-body)]">
      <main className="flex-grow flex flex-col items-center px-4 sm:px-5 pb-10 sm:pb-16">

      {/* ── Choice Modal ──────────────────────── */}
      {showChoiceModal && (
        <div 
          className="fixed inset:0 z-[10000] flex items-center justify-center p-4"
          style={{ position: 'fixed', inset: 0 }}
        >
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setShowChoiceModal(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 w-full max-w-[320px] shadow-2xl anim-scale text-center">
            <h3 className="text-lg font-semibold mb-6 text-[var(--clr-text)]">Add a photo</h3>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowChoiceModal(false);
                  handleUploadClick();
                }}
                className="w-full py-4 rounded-2xl bg-[var(--clr-bg)] border border-[var(--clr-border)] text-[var(--clr-text)] font-semibold flex items-center justify-center gap-3 hover:bg-[var(--clr-accent-light)] hover:border-[var(--clr-accent)] transition-all"
              >
                <UploadIcon className="text-[var(--clr-accent)]" />
                Choose Photo
              </button>
              
              <button
                onClick={() => {
                  setShowChoiceModal(false);
                  handleCameraClick();
                }}
                className="w-full py-4 rounded-2xl bg-[var(--clr-bg)] border border-[var(--clr-border)] text-[var(--clr-text)] font-semibold flex items-center justify-center gap-3 hover:bg-[var(--clr-accent-light)] hover:border-[var(--clr-accent)] transition-all"
              >
                <CameraIcon className="text-[var(--clr-accent)]" />
                Take Photo
              </button>
            </div>
            
            <button 
              onClick={() => setShowChoiceModal(false)}
              className="mt-6 text-sm text-[var(--clr-text-sec)] font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Camera Modal ──────────────────────── */}
      {showCamera && (
        <CameraModal
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* ── App Download Modal ─────────────────── */}
      {showPromo && <AppDownloadCTA onClose={handleDismissPromo} />}

      {/* ── Brand Header ──────────────────────────────── */}
      <header className="text-center mt-[clamp(28px,6vh,80px)] sm:mt-[clamp(40px,8vh,80px)] mb-5 sm:mb-8 anim-fade-up">
        <button 
          onClick={resetAll} 
          className="bg-transparent border-none p-0 cursor-pointer block mx-auto transition-transform hover:scale-[1.02] active:scale-[0.98]"
          aria-label="Go to homepage"
        >
          <img src={LogoImage.src} alt="Ubique" className="h-[44px] sm:h-[60px]" />
        </button>
      </header>

      {/* ── Hero Text ─────────────────────────────────── */}
      {messages.length === 0 && !uploadedFile && (
        <section className="text-center max-w-[480px] mb-6 sm:mb-9 anim-fade-up [animation-delay:0.1s] pt-10">
          <h1 className="text-[22px] sm:text-[30px] font-semibold leading-tight text-[var(--clr-text)] mb-3 sm:mb-4 tracking-tight">
            Your Personal Style Advisor
          </h1>
          <p className="text-[14px] sm:text-[clamp(15px,2vw,17px)] text-[var(--clr-text-sec)] leading-relaxed w-full mx-auto pt-4">
          Upload a photo and get honest feedback in seconds - what works, what to change, and what to wear instead.
          </p>
        </section>
      )}

      {/* ── Upload Card ───────────────────────────────── */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          w-full max-w-[480px] bg-[var(--clr-surface)] rounded-[16px] sm:rounded-[20px] card-upload
          px-[clamp(16px,4vw,36px)] py-[clamp(20px,4vw,40px)]
          mb-8 sm:mb-10 
          
          ${isDragging ? "dragging" : ""}
        `}
      >
        {/* Top accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-[3px] card-accent-bar opacity-40" />

        {/* Hidden file inputs — always in DOM so uploads work from any state */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleFileChange}
          className="hidden"
          id="camera-capture"
        />

        {uploadedFile ? (
          /* ── Preview + Chat State ─── */
          <div>
            {/* Pending images preview strip (initial — no messages yet) */}
            {pendingImages.length > 0 && messages.length === 0 && (
              <div className="mb-4">
                <div
                  className="flex gap-2 overflow-x-auto pb-2"
                  style={{ scrollbarWidth: "none" }}
                >
                  {pendingImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative flex-shrink-0 rounded-xl overflow-hidden border border-[var(--clr-border)] bg-white shadow-lg p-1.5"
                      style={{ width: pendingImages.length === 1 ? "100%" : 120, height: pendingImages.length === 1 ? "auto" : 120 }}
                    >
                      <img
                        src={img}
                        alt={`Outfit ${idx + 1}`}
                        className="w-full h-full object-cover block"
                        style={{ maxHeight: pendingImages.length === 1 ? 240 : 120 }}
                      />
                      <button
                        onClick={() => {
                          const newImages = pendingImages.filter((_, i) => i !== idx);
                          setPendingImages(newImages);
                          if (newImages.length === 0) resetAll();
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center text-xs font-bold cursor-pointer border-none hover:bg-black/70 transition-colors"
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowChoiceModal(true)}
                  className="mt-2 text-xs text-[#8410CA] font-semibold bg-transparent border-none cursor-pointer flex items-center gap-1 mx-auto hover:underline"
                >
                  <ImagePlusIcon className="!w-4 !h-4" /> Add another photo
                </button>
              </div>
            )}
            {/* Chat Messages Thread */}
            {messages.length > 0 && (
              <div
                className="mb-4 overflow-y-auto"
                style={{
                  maxHeight: "min(600px, 55vh)",
                  scrollbarWidth: "none",
                }}
              >
                <div className="flex flex-col gap-3">
                  {messages.map((msg, idx) => {
                    const isUser = msg.role === "user";
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2 mb-1 anim-fade-up`}
                      >
                        {!isUser && (
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[var(--clr-border)] mb-1 bg-black">
                            <img src={AiIcon.src} alt="AI" className="w-full h-full object-scale-down" />
                          </div>
                        )}
                        <div
                          className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-sm leading-relaxed ${isUser
                            ? "bg-[var(--clr-border)] text-[var(--clr-text)] border border-[var(--clr-border)] rounded-br-md"
                            : "bg-[var(--clr-bg)] text-[var(--clr-text)] border border-[var(--clr-border)] rounded-bl-md"
                            }`}
                        >

                          {isUser ? (
                            <div className="flex flex-col gap-3">
                              <span>{msg.content}</span>
                              {msg.images && msg.images.length > 0 && (
                                <div className={`flex gap-1.5 ${msg.images.length === 1 ? "flex-col" : "flex-wrap"}`}>
                                  {msg.images.map((img, imgIdx) => (
                                    <div
                                      key={imgIdx}
                                      className="rounded-lg overflow-hidden border border-[var(--clr-border)] bg-white shadow-md p-1.5"
                                      style={{ width: msg.images!.length === 1 ? "100%" : "calc(50% - 3px)" }}
                                    >
                                      <img
                                        src={img}
                                        alt={`Outfit ${imgIdx + 1}`}
                                        className="w-full h-auto object-cover block"
                                        style={{ maxHeight: msg.images!.length === 1 ? 300 : 150 }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            renderMarkdown(msg.content)
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing indicator */}
                  {isAsking && (
                    <div className="flex justify-start items-end gap-2 anim-fade">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[var(--clr-border)] mb-1">
                        <img src={AiIcon.src} alt="AI" className="w-full h-full object-cover" />
                      </div>
                      <div className="px-4 py-3">
                        <div className="flex gap-1.5 items-center">
                          <div className="w-2 h-2 rounded-full bg-[#8410CA]" style={{ animation: "pulse 1.2s ease infinite" }} />
                          <div className="w-2 h-2 rounded-full bg-[#8410CA]" style={{ animation: "pulse 1.2s ease 0.2s infinite" }} />
                          <div className="w-2 h-2 rounded-full bg-[#8410CA]" style={{ animation: "pulse 1.2s ease 0.4s infinite" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              </div>
            )}

            {/* Quick question chips (show only when no messages yet and chat not disabled) */}
            {messages.length === 0 && !chatDisabled && (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => askQuestion(q)}
                    disabled={isAsking}
                    className="text-[11px] sm:text-[12px] px-2.5 sm:px-3 py-1.5 rounded-full border border-[var(--clr-border)] text-[var(--clr-text-sec)] bg-transparent cursor-pointer font-[var(--font-body)] hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)] hover:bg-[var(--clr-accent-light)] transition-all duration-150 disabled:opacity-50 disabled:cursor-default"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Chat input OR disabled CTA */}
            {/* Mid-chat pending images preview (above input bar) */}
            {pendingImages.length > 0 && messages.length > 0 && !chatDisabled && (
              <div className="mb-3">
                <div
                  className="flex gap-2 overflow-x-auto pb-1"
                  style={{ scrollbarWidth: "none" }}
                >
                  {pendingImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative flex-shrink-0 rounded-lg overflow-hidden border border-[var(--clr-border)] bg-white shadow-sm p-1"
                      style={{ width: 72, height: 72 }}
                    >
                      <img
                        src={img}
                        alt={`Outfit ${idx + 1}`}
                        className="w-full h-full object-cover block"
                      />
                      <button
                        onClick={() => {
                          const newImages = pendingImages.filter((_, i) => i !== idx);
                          setPendingImages(newImages);
                          if (newImages.length === 0 && messages.length === 0) resetAll();
                        }}
                        className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center text-[10px] font-bold cursor-pointer border-none hover:bg-black/70 transition-colors"
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {chatDisabled ? (
              <div className="text-center py-3 px-4 rounded-2xl mb-4 anim-fade-up" style={{ background: "rgba(132,16,202,0.06)", border: "1px solid rgba(132,16,202,0.15)" }}>
                <p className="text-sm font-semibold text-[var(--clr-text)] mb-1">
                  You&apos;ve used your free styling advice!
                </p>
                <p className="text-xs text-[var(--clr-text-sec)] mb-3">
                  Download the app for unlimited fashion chats.
                </p>
                <button
                  onClick={() => setShowPromo(true)}
                  className="px-5 py-2 rounded-full bg-[#8410CA] text-white text-sm font-semibold border-none cursor-pointer hover:bg-[#6d00cc] transition-colors"
                >
                  Get the App
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mb-4 items-center">
                {messages.length > 0 && (
                  <button
                    onClick={() => {
                      keepChatRef.current = true;
                      setShowChoiceModal(true);
                    }}
                    className="w-11 h-11 rounded-full bg-[#F0F0F0] border-none flex items-center justify-center text-[#1a1a1a] cursor-pointer hover:bg-[#E5E5E5] transition-colors flex-shrink-0"
                    aria-label="Upload again"
                  >
                    <ImagePlusIcon />
                  </button>
                )}
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      askQuestion(question);
                    }
                  }}
                  placeholder={messages.length === 0 ? "Ask anything - fit, colours, occasion…" : "Go deeper - ask about fit, styling…"}
                  disabled={isAsking}
                  className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full border border-[var(--clr-border)] bg-[var(--clr-bg)] text-[var(--clr-text)] text-[13px] sm:text-sm font-[var(--font-body)] outline-none placeholder:text-[var(--clr-text-tri)] focus:border-[var(--clr-accent)] transition-colors disabled:opacity-50"
                  id="chat-input"
                />
                <button
                  onClick={() => askQuestion(question)}
                  disabled={isAsking || !question.trim()}
                  className="w-11 h-11 rounded-full bg-[#8410CA] text-white border-none cursor-pointer flex items-center justify-center flex-shrink-0 transition-all duration-150 hover:bg-[#6d00cc] disabled:opacity-40 disabled:cursor-default"
                  aria-label="Send question"
                  id="send-btn"
                >
                  {isAsking ? (
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                  ) : (
                    <SendIcon />
                  )}
                </button>
              </div>
            )}


          </div>
        ) : (
          <>
           
            <p className="text-[13px] sm:text-sm text-[var(--clr-text-sec)] text-center mb-[clamp(16px,3vw,28px)] py-6">
               Try a mirror selfie, shopping screenshot, or something you&apos;re thinking of buying.
            </p>


            {/* Upload photo */}
            <button
              id="upload-photo-btn"
              onClick={handleUploadClick}
              className="bg-[#8410CA] w-full flex items-center justify-center gap-2 sm:gap-2.5 py-3 sm:py-[15px] px-5 sm:px-6 text-[15px] sm:text-base font-semibold text-white border-none rounded-full cursor-pointer mb-3 font-[var(--font-body)] tracking-[0.01em]"
            >
              <UploadIcon />
              Choose a photo
            </button>

            {/* Take photo */}
            <button
              id="take-photo-btn"
              onClick={handleCameraClick}
              className="btn-outline w-full flex items-center justify-center gap-2 sm:gap-2.5 py-3 sm:py-3.5 px-5 sm:px-6 text-[14px] sm:text-[15px] font-medium text-[var(--clr-text)] bg-transparent border-[1.5px] border-[var(--clr-border)] rounded-full cursor-pointer mb-4 sm:mb-5 font-[var(--font-body)]"
            >
              <CameraIcon />
              Take photo
            </button>

            {/* Privacy */}
            <p className="flex items-center justify-center gap-1.5 text-[12px] sm:text-[13px] text-[var(--clr-text-tri)] text-center py-6">
              <LockIcon />
              Your photo stays private. Never saved, never shared.
            </p>
          </>
        )}
      </div>

      {/* ── Feature Bullets ───────────────────────────── */}
      <section className="max-w-[460px] w-full mb-8 sm:mb-10 anim-fade-up [animation-delay:0.4s]">
        <ul className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
          {[
            "Instant Analysis",
            "Color Harmony",
            "Fit Advice",
          ].map((text, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5"
            >
              <div className="flex -space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-[#8410CA]" />
                <div className="w-2 h-2 rounded-full bg-[#8410CA] opacity-40" />
              </div>
              <span className="text-[13px] sm:text-[14px] text-[var(--clr-text-sec)] font-medium tracking-tight">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Social Proof ──────────────────────────────── */}
      <section className="text-center max-w-[600px] mb-8 sm:mb-12 anim-fade [animation-delay:0.7s]">
        <p className="text-[13px] sm:text-sm text-[var(--clr-text-tri)] leading-relaxed italic mb-4 sm:mb-6">
    This is a demo. Get the full experience on the UBIQUE FASHION app.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <a
            href="https://apps.apple.com/us/app/ubique-fashion-style-advisor/id6553972786"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-black text-white rounded-xl hover:scale-[1.03] transition-transform shadow-sm"
          >
            <svg width="16" height="19" viewBox="0 0 20 24" fill="currentColor">
              <path d="M15.07 12.95c-.03-2.79 2.28-4.14 2.38-4.21-1.3-1.9-3.32-2.16-4.04-2.19-1.72-.17-3.36 1.01-4.23 1.01-.87 0-2.22-.99-3.65-.96-1.88.03-3.61 1.09-4.58 2.78-1.95 3.39-.5 8.41 1.4 11.16.93 1.34 2.04 2.85 3.49 2.8 1.4-.06 1.93-.91 3.63-.91 1.69 0 2.18.91 3.66.88 1.51-.03 2.48-1.37 3.4-2.72 1.07-1.56 1.51-3.07 1.54-3.15-.03-.01-2.95-1.13-2.98-4.49zM12.25 4.6c.77-.94 1.29-2.24 1.15-3.54-1.11.05-2.45.74-3.25 1.67-.71.82-1.34 2.14-1.17 3.4 1.24.1 2.5-.63 3.27-1.53z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] leading-none opacity-60">Download on the</div>
              <div className="text-[14px] font-semibold leading-none mt-0.5">App Store</div>
            </div>
          </a>
          
          <a
            href="https://play.google.com/store/apps/details?id=com.ubique"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-black text-white rounded-xl hover:scale-[1.03] transition-transform shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .61-.92z" fill="#4285F4" />
              <path d="M17.114 8.68L5.442.86 14.86 10.93 17.114 8.68z" fill="#EA4335" />
              <path d="M20.683 10.346l-3.17-1.847L14.86 12l2.653 3.5 3.17-1.846c.89-.52.89-1.788 0-2.308z" fill="#FBBC04" />
              <path d="M5.442 23.14l11.672-7.82L14.86 13.07 5.442 23.14z" fill="#34A853" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] leading-none opacity-60">GET IT ON</div>
              <div className="text-[14px] font-semibold leading-none mt-0.5">Google Play</div>
            </div>
          </a>
        </div>
      </section>
      </main>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="bg-[var(--clr-bg)] border-t border-[var(--clr-border)] py-8 px-4 sm:px-5">
        <div className="max-w-[800px] mx-auto w-full text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-[11px] sm:text-[12px] text-[var(--clr-text-tri)] font-medium uppercase tracking-widest">
            <a href="https://www.ubiquefashion.com/legal" className="hover:text-[var(--clr-text-sec)] transition-colors">Terms & Conditions</a>
            <span className="hidden sm:inline">|</span>
            <a href="https://www.ubiquefashion.com/privacy-policy" className="hover:text-[var(--clr-text-sec)] transition-colors">Privacy Policy</a>
            <span className="hidden sm:inline">|</span>
            <span>Ubique S.R.L.</span>
            <span className="hidden sm:inline">|</span>
            <span>P.IVA 11226420963</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
