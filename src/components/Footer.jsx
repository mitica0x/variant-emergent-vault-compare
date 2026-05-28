import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Send, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="hairline-t mt-24">
      <div className="container-x py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center hairline">
              <span className="font-mono text-[11px] text-cyan">C</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight">
              Coin<span className="text-cyan">S</span>iglieri
            </span>
          </Link>
          <p className="mt-4 text-[13px] text-muted leading-relaxed">
            Independent EU/MiCAR crypto exchange intelligence.
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-emerald">
            All Signal. 0 Guess.
          </p>
          <div className="flex items-center gap-3 mt-6 text-muted">
            <a href="https://x.com/coinsiglieri" target="_blank" rel="noopener noreferrer" className="hover:text-txt transition-colors"><Twitter size={16} /></a>
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
          <p className="text-[12px] text-muted">
            © {new Date().getFullYear()} CoinSiglieri. All rights reserved.
          </p>
          <p className="text-[12px] text-muted max-w-3xl">
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
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[14px] text-txt hover:text-cyan transition-colors">
                {label}
              </a>
            ) : (
              <Link to={href} className="text-[14px] text-txt hover:text-cyan transition-colors">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
