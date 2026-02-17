import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles, Shield, Eye, MessageSquare, Scale, FileText } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { Button } from "@/components/ui/button";

const ServiceCard = ({
  service,
  index,
  inView,
}: {
  service: (typeof portfolioConfig.services)[0];
  index: number;
  inView: boolean;
}) => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`relative glass-card p-8 flex flex-col ${service.highlighted
        ? "border-primary/50 glow"
        : "card-hover"
        }`}
    >
      {/* Popular Badge */}
      {service.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold gradient-text">{service.price}</span>
          <span className="text-muted-foreground">{service.period}</span>
        </div>
        <p className="text-muted-foreground text-sm mt-3">{service.description}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-0.5 p-1 rounded-full bg-primary/10">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        onClick={scrollToContact}
        className={`w-full ${service.highlighted
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-secondary text-foreground hover:bg-secondary/80"
          }`}
      >
        {service.ctaText}
      </Button>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="py-20 md:py-32 relative overflow-hidden bg-secondary/20"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Services & <span className="gradient-text">Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible packages designed to meet your needs, from simple websites
            to enterprise cloud architectures.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {portfolioConfig.services.map((service, index) => (
            <ServiceCard
              key={service.name}
              service={service}
              index={index}
              inView={isInView}
            />
          ))}
        </div>

        {/* Payment Terms Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Payment <span className="gradient-text">Terms</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Small Projects */}
            <div className="glass-card p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-xl font-bold mb-2">Small Projects</h4>
              <p className="text-primary font-mono text-sm mb-4">&lt;$3K Budget</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Upfront</span>
                  <span className="text-foreground font-medium">50%</span>
                </div>
                <div className="flex justify-between">
                  <span>On Delivery</span>
                  <span className="text-foreground font-medium">50%</span>
                </div>
              </div>
            </div>

            {/* Medium Projects */}
            <div className="glass-card p-6 relative overflow-hidden group border-primary/50">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-bl-lg">
                MOST POPULAR
              </div>
              <h4 className="text-xl font-bold mb-2">Medium Projects</h4>
              <p className="text-primary font-mono text-sm mb-4">$3K - $10K Budget</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Upfront</span>
                  <span className="text-foreground font-medium">40%</span>
                </div>
                <div className="flex justify-between">
                  <span>Mid-Project</span>
                  <span className="text-foreground font-medium">40%</span>
                </div>
                <div className="flex justify-between">
                  <span>On Delivery</span>
                  <span className="text-foreground font-medium">20%</span>
                </div>
              </div>
            </div>

            {/* Large Projects */}
            <div className="glass-card p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-xl font-bold mb-2">Large Projects</h4>
              <p className="text-primary font-mono text-sm mb-4">&gt;$10K Budget</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Upfront</span>
                  <span className="text-foreground font-medium">30%</span>
                </div>
                <div className="flex justify-between">
                  <span>At Milestones</span>
                  <span className="text-foreground font-medium">40%</span>
                </div>
                <div className="flex justify-between">
                  <span>On Delivery</span>
                  <span className="text-foreground font-medium">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Commitment Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10 relative overflow-hidden border-primary/20 bg-secondary/10"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-8 -mt-4 -mr-4 opacity-[0.03] pointer-events-none">
              <Shield className="w-64 h-64 text-primary" />
            </div>

            <div className="relative z-10 text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-primary/10 text-primary">
                <Scale className="w-8 h-8" />
              </div>

              {portfolioConfig.ethicalCommitment && (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {portfolioConfig.ethicalCommitment.title}
                  </h3>

                  <div className="relative max-w-2xl mx-auto mb-8">
                    <span className="absolute -top-4 -left-4 text-4xl text-primary/20 font-serif">"</span>
                    <p className="text-muted-foreground text-lg italic leading-relaxed px-6">
                      {portfolioConfig.ethicalCommitment.subtitle}
                    </p>
                    <span className="absolute -bottom-8 -right-4 text-4xl text-primary/20 font-serif rotate-180">"</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 relative z-10 pt-4">
                    {portfolioConfig.ethicalCommitment.items.map((item, index) => (
                      <div
                        key={index}
                        className="group flex flex-col items-center text-center p-6 rounded-xl bg-background/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 hover:bg-background/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="mb-4 p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                          {item.key.includes("Ethical") && <Shield className="w-6 h-6 text-primary" />}
                          {item.key.includes("Transparency") && <FileText className="w-6 h-6 text-primary" />}
                          {item.key.includes("Communication") && <MessageSquare className="w-6 h-6 text-primary" />}
                        </div>

                        <h4 className="font-bold text-foreground mb-3 text-lg">{item.key}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Custom Quote CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Need something custom? Let's discuss your specific requirements.
          </p>
          <Button
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Request Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
