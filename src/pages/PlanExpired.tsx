import { useEffect } from "react";
import { AlertTriangle, Phone, MessageCircle, RefreshCw, Clock } from "lucide-react";

const SUPPORT_PHONE_DISPLAY = "+1 302-404-2011";
const SUPPORT_PHONE_RAW = "+13024042011";

const PlanExpired = () => {
  useEffect(() => {
    document.title = "Hosting Plan Expired | Service Suspended";

    const meta = document.querySelector('meta[name="robots"]') ?? document.createElement("meta");
    meta.setAttribute("name", "robots");
    meta.setAttribute("content", "noindex, nofollow");
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);

  return (
    <main className="min-h-screen w-full bg-[hsl(200_43%_21%)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Status bar */}
          <div className="bg-[hsl(0_84%_60%)] px-6 py-3 flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-white" aria-hidden="true" />
            <span className="text-white text-sm font-semibold tracking-wide uppercase">
              Service Suspended
            </span>
          </div>

          <div className="px-6 sm:px-10 py-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[hsl(0_84%_60%/0.1)] flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-[hsl(0_84%_60%)]" aria-hidden="true" />
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[hsl(200_43%_21%)] mb-4">
              Your Hosting Plan Has Expired
            </h1>

            <p className="text-[hsl(200_20%_40%)] text-base sm:text-lg leading-relaxed mb-3">
              This website is temporarily unavailable because the hosting subscription
              for this domain has expired.
            </p>
            <p className="text-[hsl(200_20%_40%)] text-base leading-relaxed mb-8">
              Please renew the subscription to restore the website and bring all
              services back online.
            </p>

            {/* Contact block */}
            <div className="bg-[hsl(218_33%_97%)] border border-[hsl(220_13%_91%)] rounded-xl p-6 mb-8">
              <p className="text-sm font-semibold text-[hsl(200_43%_21%)] uppercase tracking-wide mb-1">
                To renew your plan, contact us
              </p>
              <p className="text-xs text-[hsl(200_20%_40%)] mb-4">
                Our support team is available to help you reactivate your service.
              </p>

              <a
                href={`tel:${SUPPORT_PHONE_RAW}`}
                className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-bold text-[hsl(200_51%_37%)] hover:text-[hsl(200_43%_21%)] transition-colors"
              >
                <Phone className="w-6 h-6" aria-hidden="true" />
                {SUPPORT_PHONE_DISPLAY}
              </a>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <a
                  href={`tel:${SUPPORT_PHONE_RAW}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[hsl(25_95%_53%)] hover:bg-[hsl(21_90%_48%)] text-white font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 text-sm text-[hsl(200_20%_40%)] hover:text-[hsl(200_43%_21%)] transition-colors"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Already renewed? Refresh this page
            </button>
          </div>

          <div className="border-t border-[hsl(220_13%_91%)] px-6 py-4 bg-[hsl(218_33%_97%)]">
            <p className="text-xs text-center text-[hsl(200_20%_40%)]">
              Error 402 &mdash; Subscription Required. All website data is safe and will
              be restored immediately after renewal.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlanExpired;
