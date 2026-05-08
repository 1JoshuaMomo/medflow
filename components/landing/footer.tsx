"use client"

import Link from "next/link"
import { Zap, Twitter, Linkedin, Github, Mail } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Demo", href: "/demo" },
    { label: "Integrations", href: "/integrations" },
    { label: "API", href: "/api" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Help Center", href: "/help" },
    { label: "Community", href: "/community" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Webinars", href: "/webinars" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "HIPAA", href: "/hipaa" },
    { label: "GDPR", href: "/gdpr" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/medflowai", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/medflowai", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/medflowai", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@medflow.ai", label: "Email" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="container mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-sm">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Med<span className="text-primary">Flow</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              AI-powered clinic operations platform. Turn missed appointments into revenue.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MedFlow AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              All systems operational
            </span>
            <span className="text-sm text-muted-foreground">
              HIPAA Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
