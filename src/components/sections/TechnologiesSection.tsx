"use client";

import { FadeIn } from "@/components/ui/MotionWrapper";

const techs = [
  { category: "IA Frameworks", items: ["PyTorch", "ONNX", "OpenVINO", "TensorRT"] },
  { category: "Détection", items: ["YOLOv8/v9", "RT-DETR", "SAM", "DeepSORT"] },
  { category: "Infrastructure", items: ["Kubernetes", "Docker", "Triton", "FastAPI"] },
  { category: "MLOps", items: ["MLflow", "DVC", "Prometheus", "Grafana"] },
];

export function TechnologiesSection() {
  return (
    <section className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content">
        <FadeIn className="text-center mb-12">
          <p className="text-accent text-sm font-medium mb-3">Stack Technique</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Technologies de pointe
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techs.map((tech, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="card-glass border-glow h-full">
                <h3 className="text-primary font-semibold mb-4">{tech.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-neutral-800/50 rounded-full text-secondary text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
