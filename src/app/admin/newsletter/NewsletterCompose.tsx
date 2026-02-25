"use client";

import { useRef, useState } from "react";

interface Props {
  subscriberCount: number;
}

export default function NewsletterCompose({ subscriberCount }: Props) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [resultMsg, setResultMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setStatus("sending");

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("message", message);
    if (files) {
      Array.from(files).forEach((f) => formData.append("attachments", f));
    }

    const res = await fetch("/api/admin/newsletter/send", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setResultMsg(data.message || `Email sent to ${data.sent} subscriber${data.sent !== 1 ? "s" : ""}.`);
      setSubject("");
      setMessage("");
      setFiles(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setStatus("error");
      setResultMsg(data.error || "Failed to send email.");
    }
  };

  const fileList = files ? Array.from(files) : [];

  return (
    <div className="bg-white border border-cream-200 shadow-sm max-w-2xl">
      {subscriberCount === 0 && (
        <div className="px-6 py-4 bg-cream-100 border-b border-cream-200 text-bark-500 text-sm">
          No subscribers yet. Once visitors sign up via the newsletter form, they&apos;ll appear here.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="px-6 py-6 space-y-5">
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-xs font-bold text-bark-600 uppercase tracking-wide mb-1">
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => { setSubject(e.target.value); setStatus("idle"); }}
              required
              placeholder="e.g. New seasonal flavors are here!"
              className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-bark-800 font-sans text-sm focus:outline-none focus:border-bark-500 focus:ring-1 focus:ring-bark-500 rounded-sm"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-bark-600 uppercase tracking-wide mb-1">
              Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => { setMessage(e.target.value); setStatus("idle"); }}
              required
              rows={10}
              placeholder="Write your message here…"
              className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-bark-800 font-sans text-sm focus:outline-none focus:border-bark-500 focus:ring-1 focus:ring-bark-500 rounded-sm resize-y"
            />
          </div>

          {/* Attachments */}
          <div>
            <label htmlFor="attachments" className="block text-xs font-bold text-bark-600 uppercase tracking-wide mb-1">
              Attachments
            </label>
            <input
              id="attachments"
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full text-sm text-bark-600 font-sans file:mr-4 file:py-2 file:px-4 file:border file:border-cream-300 file:text-sm file:font-semibold file:bg-cream-100 file:text-bark-700 hover:file:bg-cream-200 file:cursor-pointer"
            />
            {fileList.length > 0 && (
              <ul className="mt-2 space-y-1">
                {fileList.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-bark-500">
                    <svg className="w-3.5 h-3.5 text-bark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    {f.name} <span className="text-bark-400">({(f.size / 1024).toFixed(1)} KB)</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Status message */}
          {status === "success" && (
            <div className="flex items-center gap-2 text-sage-600 bg-sage-100 border border-sage-200 px-4 py-3 rounded-sm text-sm" role="status">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {resultMsg}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-rust-600 bg-rust-100 border border-rust-200 px-4 py-3 rounded-sm text-sm" role="alert">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {resultMsg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cream-200 flex items-center justify-between">
          <p className="text-bark-400 text-sm">
            Will be sent to <strong className="text-bark-600">{subscriberCount}</strong> subscriber{subscriberCount !== 1 ? "s" : ""}
          </p>
          <button
            type="submit"
            disabled={status === "sending" || subscriberCount === 0}
            className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Newsletter
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
