import Link from "next/link"
import { Zap } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/20 via-background to-background overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-sm">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Med<span className="text-primary">Flow</span>
            </span>
          </Link>
          
          {/* Testimonial */}
          <div className="max-w-md">
            <blockquote className="text-2xl font-medium mb-6 leading-relaxed">
              &ldquo;MedFlow AI transformed our clinic operations. We recovered $15,000 in lost revenue in the first month alone.&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                SM
              </div>
              <div>
                <div className="font-semibold">Dr. Sarah Mitchell</div>
                <div className="text-sm text-muted-foreground">Director, City Dental Clinic</div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-sm text-muted-foreground">Clinics Trust Us</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">30%</div>
              <div className="text-sm text-muted-foreground">Revenue Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">85%</div>
              <div className="text-sm text-muted-foreground">No-Show Reduction</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-sm">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Med<span className="text-primary">Flow</span>
              </span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}
