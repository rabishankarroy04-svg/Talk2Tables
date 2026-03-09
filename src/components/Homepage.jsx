import { useEffect, useRef } from "react";
import logo from "./Talk2Tables_logo.png";
import "./Homepage.css";

/* ─── Data ─── */
const NAV_LINKS = ["How it works", "Features", "Pricing"];

const STEPS = [
  {
    n: "1",
    title: "Connect your database",
    desc: "Link your MySQL, PostgreSQL, or any SQL database in seconds. No configuration required — just paste your credentials.",
  },
  {
    n: "2",
    title: "Ask in plain English",
    desc: "Type any business question naturally — \"Which customers haven't ordered in 3 months?\" — exactly as you'd ask a colleague.",
  },
  {
    n: "3",
    title: "Get instant results",
    desc: "Talk2Table converts your question to SQL, runs it live, and returns your data as a clean table or chart — in under 2 seconds.",
  },
];

const FEATURES = [
  { icon: "🧠", title: "Natural language queries", desc: "Write questions the way you think them. Talk2Table understands context, typos, and even vague phrasing." },
  { icon: "⚡", title: "Instant SQL generation", desc: "See the exact SQL generated for every query — transparent, editable, and ready to copy if you need it." },
  { icon: "📊", title: "Auto charts & tables", desc: "Results automatically rendered in the best visual format — bar charts, tables, line graphs — no setup needed." },
  { icon: "🕘", title: "Query history", desc: "Every question you've ever asked is saved and searchable. Rerun past queries with one click." },
];

const TEAM = [
  {
    name: "Rabishankar Roy",
    email: "rabishankarroy04@gmail.com",
    linkedin: "https://linkedin.com/in/rabishankar-roy-055a52343/",
  },
  {
    name: "Kathakali Das",
    email: "2004kathakali@gmail.com",
    linkedin: "https://linkedin.com/in/kd-46a93623b/",
  },
  {
    name: "Roupyadeep Ghosal",
    email: "roupyadeepghosal@gmail.com",
    linkedin: "https://linkedin.com/in/roupyadeep-ghosal-234985304/",

  },
  {
    name: "Srijan Ghosh",
    email: "srijanghosh69@gmail.com",
    linkedin: "https://linkedin.com/in/srijan-ghosh-1872072b1/",
  },
];

const TABLE_ROWS = [
  ["Pro Plan", "$48,200", "241"],
  ["Enterprise", "$36,800", "92"],
  ["Starter Kit", "$19,400", "388"],
  ["Add-on Bundle", "$11,750", "156"],
  ["Legacy Plan", "$8,300", "83"],
];

/* ─── Icons ─── */
const LinkedinIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ─── Component ─── */
export default function Homepage({ onLogin, onSignup }) {
  const revealRefs = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="t2t-root">

      {/* Background orbs */}
      <div className="t2t-orb t2t-orb-1" />
      <div className="t2t-orb t2t-orb-2" />
      <div className="t2t-orb t2t-orb-3" />

      {/* ── Navbar ── */}
      <nav className="t2t-nav">
        <div className="t2t-logo">
          <div className="t2t-logo-icon">
            <img src={logo} alt="logo" />
          </div>
          <h1>Talk2Table</h1>
        </div>

        <ul className="t2t-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase().replace(/\s/g, "-")}`}>{link}</a>
            </li>
          ))}
          <li>
            <button className="nav-contact-btn" onClick={scrollToFooter}>
              Contact us
            </button>
          </li>
        </ul>

        <div className="t2t-nav-actions">
          <button className="btn-ghost" onClick={onLogin}>Log in</button>
          <button className="btn-primary" onClick={onSignup}>Get started free</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="t2t-hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          No SQL knowledge required
        </div>

        <h2>
          Your data understands <em>English</em>
        </h2>

        <p>
          Talk2Tables converts everyday questions into SQL queries and visual insights instantly.
        </p>


        {/* Chat demo card */}
        <div className="hero-demo">

          <div className="demo-body">
            <div className="demo-msg user">
              <div className="demo-avatar user">🙋</div>
              <div className="demo-bubble user">
                Show me the top 5 products by revenue this month
              </div>
            </div>

            <div className="demo-msg ai">
              <div className="demo-avatar ai">
                <img src={logo} alt="logo" />
              </div>
              <div className="demo-bubble ai">
                Sure! Here's what I found:
                <div className="sql-chip">
                  SELECT product_name, SUM(revenue) AS total<br />
                  FROM sales WHERE MONTH(date) = MONTH(NOW())<br />
                  GROUP BY product_name ORDER BY total DESC LIMIT 5;
                </div>
                <div className="result-table">
                  <table>
                    <thead>
                      <tr><th>Product</th><th>Revenue</th><th>Orders</th></tr>
                    </thead>
                    <tbody>
                      {TABLE_ROWS.map(([product, revenue, orders]) => (
                        <tr key={product}>
                          <td>{product}</td><td>{revenue}</td><td>{orders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="t2t-section" id="how-it-works">
        <div className="reveal" ref={addReveal}>
          <h3 className="section-heading">Three steps to your answer</h3>
          <p className="section-sub">
            We handle all the technical heavy lifting so you can focus on the insights that matter.
          </p>
        </div>
        <div className="steps-grid reveal" ref={addReveal}>
          {STEPS.map((s) => (
            <div className="step-card" key={s.n}>
              <div className="step-number">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="t2t-section" id="features">
        <div className="reveal" ref={addReveal}>
          <h3 className="section-heading">Built for real people,<br />not just developers</h3>
          <p className="section-sub">
            Everything a non-technical user needs to explore data without any help from IT.
          </p>
        </div>
        <div className="features-grid reveal" ref={addReveal}>
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="t2t-footer" ref={footerRef} id="contact-us">

        <div className="footer-inner">

          {/* Col 1 — Brand & description */}
          <div className="footer-col">
            <div className="footer-logo">Talk2Table</div>
            <p className="footer-desc">
              Talk2Table is an AI-powered tool that lets anyone query a database
              using plain English — no SQL knowledge needed. Connect your database,
              ask a question, and get instant results as tables or charts.
              Built for analysts, managers, and teams who want answers without
              waiting on developers.
            </p>
          </div>

          {/* Col 2 — Nav links */}
          <div className="footer-col">
            <div className="footer-col-label">Navigation</div>
            <div className="footer-nav-links">
              {["Product", "Pricing", "Docs", "Privacy", "Terms"].map((l) => (
                <a href="#/" key={l}>{l}</a>
              ))}
            </div>
          </div>

          {/* Col 3 — Team */}
          <div className="footer-col">
            <div className="footer-col-label">Meet the team</div>
            {TEAM.map((member) => (
              <div className="footer-member" key={member.name}>
                <div className="footer-member-info">
                  <span className="footer-member-name">{member.name}</span>
                  <span className="footer-member-email">{member.email}</span>
                </div>
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="footer-linkedin" title="LinkedIn">
                  <LinkedinIcon />
                </a>
              </div>
            ))}
          </div>

        </div>

        <div className="footer-copy">© 2026 Talk2Table. All rights reserved.</div>

      </footer>

    </div>
  );
}