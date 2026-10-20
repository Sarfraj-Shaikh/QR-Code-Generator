import { QRCode, ColorPicker, Upload, Button, message } from "antd";
import { createElement, useRef, useState } from "react";

const App = () => {
  const [icon, setIcon] = useState(null);
  const [color, setColor] = useState(null);
  const [formData, setFormData] = useState({
    link: "",
    color: "",
    logo: "",
  });
  const img = useRef(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.link || formData.link.trim() === "") {
      return message.error("Destination URL Is Required");
    }


  };

  const handleDownload = () => {

    if (!img.current) {
      return message.warning("Invalid Request");
    }

    if(!formData.link || formData.link.trim() === "") {
      return message.info("Cannot Download");
    }

    const canvas = img.current.querySelector("canvas");
    const imgUrl = canvas.toDataURL("img/png");

    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = "qr-code";
    a.click();
    a.remove();
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-6 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-700 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <header className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition duration-300 hover:rotate-6 hover:scale-105">
              <i className="ri-qr-code-line text-2xl" />
            </div>

            <div>

              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                QR Studio
              </h1>

              <p className="mt-0.5 text-sm text-slate-500">
                Create something worth scanning.
              </p>

            </div>

          </div>

        </header>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">

          {/* PREVIEW PANEL */}
          <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 lg:sticky lg:top-8 lg:col-span-5">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">

              <div>
                <h3 className="text-base font-bold text-slate-900">Live Preview</h3>
                <p className="mt-1 text-xs text-slate-500">Your design, at a glance</p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                <i className="ri-eye-line text-sm" />
                Preview
              </span>

            </div>

            <div className="p-5 sm:p-7">

              <div className="group relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-[#fafbff] p-6 sm:min-h-[390px]">

                <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-indigo-100/60 blur-3xl transition-all duration-700 group-hover:bg-indigo-200/70" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-violet-100/70 blur-3xl transition-all duration-700 group-hover:bg-violet-200/70" />
                <div className="relative z-10 rounded-3xl border border-white bg-white p-5 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100 sm:p-7">

                  <div ref={img} className="flex items-center justify-center rounded-xl bg-white p-2">

                    <QRCode
                      value={formData.link || "https://www.youtube.com/@workwithsarfraj"}
                      size={230}
                      icon={icon || undefined}
                      bgColor="#ffffff"
                      color={color || "#111827"}
                      bordered={false}
                    />

                  </div>

                  <div className="mt-4 border-t border-dashed border-slate-200 pt-4 text-center">
                    <p className="text-sm font-semibold text-slate-800">Scan me</p>
                    <p className="mt-1 text-xs text-slate-400">Your destination starts here</p>
                  </div>

                </div>

                <div className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white/90 text-indigo-500 shadow-sm transition-transform duration-300 group-hover:rotate-12">
                  <i className="ri-scan-2-line text-xl" />
                </div>
                <div className="pointer-events-none absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white/90 text-violet-500 shadow-sm transition-transform duration-300 group-hover:-rotate-12">
                  <i className="ri-focus-3-line text-xl" />
                </div>
              </div>

              {/* DOWNLOAD QR */}
              <button
                type="button"
                onClick={handleDownload}
                className="group mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-[0.98]"
              >
                <i className="ri-download-2-line text-lg transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>Download QR Code</span>
              </button>
            </div>

          </section>

          {/* CUSTOMIZATION PANEL */}
          <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 lg:col-span-7">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <i className="ri-equalizer-3-line text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Customize your QR</h3>
                  <p className="mt-1 text-xs text-slate-500">Make it uniquely yours</p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7">

              <form onSubmit={handleSubmit} className="space-y-7">

                {/* URL INPUT */}
                <div>
                  <label htmlFor="link" className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <i className="ri-link-m text-lg text-indigo-500" />
                    Destination URL
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 transition-all duration-300 focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">

                    <i className="ri-global-line text-lg text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500" />
                    <input
                      id="link"
                      type="text"
                      name="link"
                      value={formData.link}
                      onChange={handleInput}
                      placeholder="https://yourwebsite.com"
                      className="h-12 w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <i
                      className="ri-arrow-right-up-line text-lg text-slate-300 transition-all duration-300 group-focus-within:translate-x-0.5 group-focus-within:-translate-y-0.5 group-focus-within:text-indigo-500"
                    />

                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Enter the website or destination you want to share.
                  </p>
                </div>

                {/* COLOR PICKER */}
                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <i className="ri-palette-line text-lg text-indigo-500" />
                      QR Code Color
                    </label>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-500">{color || "#000000"}</span>
                  </div>
                  <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-transform duration-300 hover:scale-105">
                        <i className="ri-brush-2-line text-xl text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Foreground color</p>
                        <p className="mt-1 text-xs text-slate-500">Choose your brand color</p>
                      </div>
                    </div>
                    <ColorPicker
                      value={color || "#000000"}
                      onChange={(value) => setColor(value.toHexString())}
                      showText
                    />
                  </div>
                </div>

                {/* LOGO UPLOAD */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <i className="ri-image-add-line text-lg text-indigo-500" />
                    Custom Logo
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Optional</span>
                  </label>

                  <Upload
                    accept="image/*"
                    maxCount={1}
                    beforeUpload={(file) => {
                      const imageUrl = URL.createObjectURL(file);
                      setIcon(imageUrl);
                      return false;
                    }}
                  >
                    <Button icon={<i className="ri-upload-cloud-2-line" />}>
                      Upload Logo
                    </Button>
                  </Upload>
                </div>
              </form>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 QR Studio. Built by Sarfraj Shaikh</p>
          <p className="flex items-center gap-1.5"><i className="ri-heart-3-fill text-rose-400" /> Made for better connections.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;