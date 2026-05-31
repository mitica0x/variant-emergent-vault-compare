import React from "react";
import { Link } from "react-router-dom";
import { Send, Linkedin, Mail } from "lucide-react";

function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="hairline-t mt-24">
      <div className="container-x py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[17px] font-semibold tracking-tight">
              <span style={{ color: "#ffffff" }}>Coin</span><span style={{ color: "#18b4d4" }}>Siglieri</span>
            </span>
          </Link>
          <p className="mt-4 text-[14px] text-muted leading-relaxed">
            Independent EU/MiCAR crypto exchange intelligence.
          </p>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-widest">
            <span style={{ color: "#fff" }}>All Signal. </span><span style={{ color: "#18b4d4" }}>0</span><span style={{ color: "#fff" }}> Guess.</span>
          </p>
          <div className="flex items-center gap-3 mt-6 text-muted">
            <a href="https://x.com/coinsiglieri" target="_blank" rel="noopener noreferrer" className="hover:text-txt transition-colors"><XIcon size={16} /></a>
            <a href="https://t.me/coinsiglieri" target="_blank" rel="noopener noreferrer" className="hover:text-txt transition-colors"><Send size={16} /></a>
            <a href="https://linkedin.com/company/coinsiglieri" target="_blank" rel="noopener noreferrer" className="hover:text-txt transition-colors"><Linkedin size={16} /></a>
            <a href="mailto:hello@coinsiglieri.com" className="hover:text-txt transition-colors"><Mail size={16} /></a>
          </div>
        </div>

        <FooterCol
          title="Platform"
          links={[
            ["Compare", "/compare"],
            ["Find My Exchange", "/find-my-exchange"],
            ["Crypto Cards", "/cards"],
            ["News", "/news"],
          ]}
        />
        <FooterCol
          title="Products"
          links={[
            ["C0insiglieri", "https://app.coinsiglieri.com", true],
            ["Ax0n (waitlist)", "#", false],
            ["Advertise", "/advertise"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["About", "/about"],
            ["Methodology", "/compare#methodology"],
            ["Contact", "/advertise#contact"],
            ["Privacy", "/about#privacy"],
          ]}
        />
      </div>
      <div className="hairline-t">
        <div className="container-x py-6 flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <p className="text-[13px] text-muted">
            © {new Date().getFullYear()} CoinSiglieri. All rights reserved.
          </p>
          <p className="text-[13px] text-muted max-w-3xl">
            Affiliate disclosure: some links on this site are partner links. We may earn a commission at no cost to you. Editorial scoring is independent and never influenced by placement.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="eyebrow text-muted mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map(([label, href, external]) => (
          <li key={label}>
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-txt hover:text-cyan transition-colors">
                {label}
              </a>
            ) : (
              <Link to={href} className="text-[15px] text-txt hover:text-cyan transition-colors">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
