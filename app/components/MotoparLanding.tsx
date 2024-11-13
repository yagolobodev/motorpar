'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPin,
    CheckCircle,
    Wrench,
    Award,
    Clock,
    Settings,
    ChevronRight,
    Star,
    MessageCircle,
    Activity,
    Gauge,
    Shield,
    Menu,
    Play,
    Pause,
    ArrowRight,
    Car,
    CircleDollarSign,
    Factory,
    Cog,
    WrenchIcon,
    Settings2,
    Hammer,
} from 'lucide-react';

// Interfaces
interface CountUpNumberProps {
    end: number;
    duration?: number;
}

interface FadeInCardProps {
    children: React.ReactNode;
    delay?: number;
}

interface VideoBackgroundProps { }

interface TestimonialType {
    name: string;
    company: string;
    role: string;
    text: string;
    image: string;
    rating: number;
}

interface ServiceType {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
}

interface LaboratoryType {
    title: string;
    description: string;
    image: string;
    features: string[];
    icon: React.ReactNode;
}

interface FeatureType {
    title: string;
    description: string;
    number?: number;
    icon: React.ReactNode;
}

interface TrabalhoType {
    title: string;
    description: string;
    image: string;
}

// Configurações de animação
const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
};

const fadeIn = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.6
        }
    }
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const scaleIn = {
    initial: {
        scale: 0.8,
        opacity: 0
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.6
        }
    }
};

const slideIn = {
    initial: {
        x: -60,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6
        }
    }
};

const slideInFromRight = {
    initial: {
        x: 60,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6
        }
    }
};

// Componente de Vídeo Background
const VideoBackground = ({ }: VideoBackgroundProps) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="absolute inset-0 overflow-hidden">
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute w-full h-full object-cover"
            >
                <source src="/videos/background-hero-section.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
            <button
                onClick={togglePlay}
                className="absolute bottom-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition"
            >
                {isPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                ) : (
                    <Play className="w-4 h-4 text-white" />
                )}
            </button>
        </div>
    );
};

const testimonials: TestimonialType[] = [
    {
        name: "João Silva",
        company: "Transportadora Silva",
        role: "Diretor de Frotas",
        text: "A Motopar superou todas as expectativas. Minha frota está operando com máxima eficiência após a retífica. O atendimento e profissionalismo da equipe são excepcionais.",
        image: "/testimonial1.jpg",
        rating: 5
    },
    {
        name: "Maria Santos",
        company: "Agro Santos",
        role: "Proprietária",
        text: "Excelente serviço técnico e atendimento. Os prazos são cumpridos à risca e a qualidade do serviço é impecável. Recomendo fortemente.",
        image: "/testimonial2.jpg",
        rating: 5
    },
    {
        name: "Carlos Oliveira",
        company: "Construtora Oliveira",
        role: "Gerente de Manutenção",
        text: "Trabalho impecável na retífica dos motores da nossa frota de caminhões. A expertise da equipe e a tecnologia utilizada são diferenciais únicos.",
        image: "/testimonial3.jpg",
        rating: 5
    },
    {
        name: "Pedro Mendes",
        company: "Logística Express",
        role: "Coordenador de Operações",
        text: "Centro de referência em retífica de motores. O laboratório Bosch e a equipe técnica são excepcionais. Parceria de confiança há mais de 10 anos.",
        image: "/testimonial4.jpg",
        rating: 5
    },
    {
        name: "Ana Costa",
        company: "Frota & Cia",
        role: "Diretora Executiva",
        text: "Serviço de excelência e suporte técnico incomparável. A Motopar é, sem dúvida, a melhor retificadora do Paraná.",
        image: "/testimonial5.jpg",
        rating: 5
    }
];

// Componentes auxiliares
const CountUpNumber = ({ end, duration = 2 }: CountUpNumberProps) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const increment = end / (duration * 60);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start > end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 1000 / 60);
                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.2 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [end, duration, isClient]);

    if (!isClient) return null;

    return (
        <motion.div
            ref={elementRef}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-[#FFF100]"
        >
            {count}+
        </motion.div>
    );
};

const FadeInCard = ({ children, delay = 0 }: FadeInCardProps) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <motion.div
            ref={elementRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group border border-gray-100"
        >
            {children}
        </motion.div>
    );
};

// Dados atualizados
const services: ServiceType[] = [
    {
        title: "Retífica Completa",
        description: "Recuperação total com tecnologia de ponta e garantia de fábrica",
        icon: <Wrench className="w-6 h-6" />,
        features: [
            "Diagnóstico avançado",
            "Peças originais",
            "Garantia estendida",
            "Suporte técnico"
        ]
    },
    {
        title: "Injeção Eletrônica",
        description: "Centro especializado em sistemas eletrônicos automotivos",
        icon: <Activity className="w-6 h-6" />,
        features: [
            "Diagnóstico computadorizado",
            "Reprogramação de módulos",
            "Calibração eletrônica",
            "Testes dinâmicos"
        ]
    },
    {
        title: "Injeção Diesel",
        description: "Autorizada Bosch com mais de 20 anos de experiência",
        icon: <Car className="w-6 h-6" />,
        features: [
            "Sistema Common Rail",
            "Bombas injetoras",
            "Bicos injetores",
            "Unidades eletrônicas"
        ]
    },
    {
        title: "Suporte 24h",
        description: "Assistência técnica especializada para frotas e emergências",
        icon: <Clock className="w-6 h-6" />,
        features: [
            "Atendimento remoto",
            "Suporte in loco",
            "Plantão 24 horas",
            "Gestão de frotas"
        ]
    }
];

const features: FeatureType[] = [
    {
        title: "40+ Anos",
        description: "De experiência comprovada",
        number: 40,
        icon: <Award className="w-8 h-8" />
    },
    {
        title: "20+ Anos",
        description: "Centro Bosch Service",
        number: 20,
        icon: <Shield className="w-8 h-8" />
    },
    {
        title: "15.000+",
        description: "Motores retificados",
        number: 15000,
        icon: <Car className="w-8 h-8" />
    },
    {
        title: "#1 Paraná",
        description: "Em tecnologia e inovação",
        icon: <Award className="w-8 h-8" />
    }
];

const laboratories: LaboratoryType[] = [
    {
        title: "Laboratório de Injeção Eletrônica",
        description: "Tecnologia de ponta em diagnóstico e reparo de sistemas eletrônicos",
        image: "/lab-eletronico.jpg",
        features: [
            "Equipamentos de última geração",
            "Técnicos certificados",
            "Diagnóstico preciso",
            "Reparo especializado"
        ],
        icon: <Activity className="w-6 h-6" />
    },
    {
        title: "Laboratório Diesel",
        description: "Centro autorizado Bosch para sistemas diesel de alta precisão",
        image: "/images/laboratorio-diesel.jpg",
        features: [
            "Tecnologia Bosch",
            "Common Rail",
            "Bombas injetoras",
            "Calibração eletrônica"
        ],
        icon: <Car className="w-6 h-6" />
    }
];

const MotoparLanding: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setScrollProgress(scroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // a linha 464 é essa

    return (
        <div className="min-h-screen">
            {/* Header Fixo */}
            {isClient && (
                <motion.header
                    className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#221E1F]/95 backdrop-blur-sm py-2' : 'bg-[#221E1F] py-4'
                        }`}
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center">
                            <motion.div
                                className="flex items-center space-x-4"
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                    src="/images/logomarca.png"
                                    alt="Motopar Logo"
                                    className="h-12"
                                />
                            </motion.div>
                            <nav className="hidden md:flex space-x-8">
                                {[
                                    ['Início', '#'],
                                    ['Serviços', '#servicos'],
                                    ['Laboratórios', '#labs'],
                                    ['Sobre', '#sobre'],
                                    ['Contato', '#contato']
                                ].map(([label, href]) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        className="text-white hover:text-[#FFF100] transition"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {label}
                                    </motion.a>
                                ))}
                            </nav>
                            <div className="flex items-center space-x-4">
                                <motion.a
                                    href="tel:+554421017800"
                                    className="hidden md:flex items-center text-[#FFF100]"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    (44) 2101-7800
                                </motion.a>
                                <motion.button
                                    className="md:hidden text-white"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.header>
            )}

            {/* Hero Section com Video Background */}
            <section className="relative min-h-screen bg-[#221E1F] text-white flex items-center">
                <VideoBackground />
                <div className="relative z-10 container mx-auto px-4 py-24">
                    <motion.div
                        className="max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            A Retífica
                            <motion.span
                                className="text-[#FFF100] block"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Referência em Tecnologia
                            </motion.span>
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl text-gray-300 mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Há mais de 40 anos entregando excelência em retífica de motores
                            com a mais alta tecnologia do mercado.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <motion.a
                                href="#contato"
                                className="bg-[#FFF100] text-[#221E1F] px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 shadow-lg flex items-center justify-center group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Solicitar Orçamento
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                            <motion.a
                                href="#servicos"
                                className="border-2 border-[#FFF100] text-[#FFF100] px-8 py-4 rounded-lg font-bold hover:bg-[#FFF100] hover:text-[#221E1F] transition flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Conheça Nossos Serviços
                            </motion.a>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-center"
                        >
                            <ChevronRight className="w-8 h-8 rotate-90 text-[#FFF100]" />
                            <span className="text-sm text-gray-400">Role para descobrir mais</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Certificações Bosch */}
            <section className="py-16 bg-[#FFF100]">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="bg-[#221E1F] rounded-2xl p-8 md:p-12 relative overflow-hidden"
                        whileInView={{ opacity: [0, 1], y: [50, 0] }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                            <img
                                src="/images/bcs_service_battery_image_640w_360h.jpg"
                                alt="Bosch Pattern"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <motion.h2
                                    className="text-3xl md:text-4xl font-bold text-[#FFF100] mb-4"
                                    variants={fadeInUp}
                                >
                                    Centro de Referência Bosch
                                </motion.h2>
                                <motion.p
                                    className="text-white text-lg mb-6"
                                    variants={fadeInUp}
                                >
                                    Mais de 20 anos como autorizada Bosch, oferecendo serviços
                                    com tecnologia de ponta e equipe altamente especializada.
                                </motion.p>
                                <motion.div
                                    className="grid grid-cols-2 gap-4"
                                    variants={stagger}
                                >
                                    {[
                                        { label: "Técnicos Certificados", value: "100%" },
                                        { label: "Satisfação Garantida", value: "98%" },
                                        { label: "Equipamentos Bosch", value: "Latest" },
                                        { label: "Garantia de Serviço", value: "12 meses" }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="text-white"
                                            variants={fadeInUp}
                                        >
                                            <p className="text-[#FFF100] text-2xl font-bold">{item.value}</p>
                                            <p className="text-sm">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                            <div className="relative">
                                <motion.img
                                    src="/images/bosch-service-logo.svg"
                                    alt="Bosch Certification"
                                    className="w-96 rounded-lg shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                    className="absolute -bottom-6 -right-6 bg-[#FFF100] text-[#221E1F] p-4 rounded-lg shadow-lg"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <p className="text-lg font-bold">20+ Anos</p>
                                    <p className="text-sm">Autorizada Bosch</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Laboratórios Especializados */}
            <section id="labs" className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl font-bold text-[#221E1F] mb-4"
                        >
                            Laboratórios de Alta Tecnologia
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-gray-600 text-lg"
                        >
                            Infraestrutura completa com equipamentos de última geração para diagnóstico
                            e reparo de sistemas de injeção eletrônica e diesel.
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {laboratories.map((lab, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden group"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={lab.image}
                                        alt={lab.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#221E1F] via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <div className="flex items-center mb-3">
                                            <div className="w-10 h-10 bg-[#FFF100] rounded-full flex items-center justify-center mr-3">
                                                {lab.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold">{lab.title}</h3>
                                        </div>
                                        <p className="text-gray-200">{lab.description}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-4">
                                        {lab.features.map((feature, idx) => (
                                            <motion.li
                                                key={idx}
                                                className="flex items-start"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <CheckCircle className="w-5 h-5 text-[#FFF100] mr-3 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-6 w-full bg-[#221E1F] text-[#FFF100] py-3 rounded-lg font-bold 
                                     hover:bg-opacity-90 transition flex items-center justify-center group"
                                    >
                                        Conhecer Laboratório
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Seção de Diferenciais Técnicos */}
                    <div className="mt-16 grid md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Activity className="w-6 h-6" />,
                                title: "Diagnóstico Preciso",
                                description: "Tecnologia avançada para identificação exata do problema"
                            },
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: "Garantia Total",
                                description: "12 meses de garantia em todos os serviços"
                            },
                            {
                                icon: <WrenchIcon className="w-6 h-6" />,
                                title: "Equipe Especializada",
                                description: "Técnicos certificados e constantemente atualizados"
                            },
                            {
                                icon: <Gauge className="w-6 h-6" />,
                                title: "Testes Dinâmicos",
                                description: "Simulações reais para garantir performance"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 bg-[#FFF100] rounded-lg flex items-center justify-center mb-4">
                                    <div className="text-[#221E1F]">{item.icon}</div>
                                </div>
                                <h4 className="text-lg font-bold text-[#221E1F] mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Galeria de Trabalhos */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl font-bold text-[#221E1F] mb-4"
                        >
                            Nossos Trabalhos
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-gray-600 text-lg max-w-2xl mx-auto"
                        >
                            Conheça alguns dos nossos trabalhos de excelência em retífica de motores
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Motor Mercedes-Benz",
                                description: "Retífica completa com upgrade de performance",
                                image: "/images/motor-mercedez-bens.jpg"
                            },
                            {
                                title: "Sistema Common Rail",
                                description: "Reparo especializado em sistema de injeção",
                                image: "/images/sistema-common-rail.jpg"
                            },
                            {
                                title: "Motor Scania",
                                description: "Reconstrução total com peças originais",
                                image: "/images/motor-scania.jpg"
                            },
                            {
                                title: "Bomba Injetora",
                                description: "Diagnóstico e calibração eletrônica",
                                image: "/images/bomba-injetora.png"
                            },
                            {
                                title: "Motor MWM",
                                description: "Retífica com aumento de potência",
                                image: "/images/motor-mwm.jpeg"
                            },
                            {
                                title: "Motor Volvo",
                                description: "Serviço completo de recondicionamento",
                                image: "/images/motor-volvo.jpg"
                            }
                        ].map((trabalho, index) => (
                            <motion.div
                                key={index}
                                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative h-64">
                                    <img
                                        src={trabalho.image}
                                        alt={trabalho.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-xl font-bold mb-2">{trabalho.title}</h3>
                                        <p className="text-sm text-gray-200">{trabalho.description}</p>
                                        <button className="mt-4 text-[#FFF100] flex items-center text-sm">
                                            Ver detalhes
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#221E1F] text-[#FFF100] px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition"
                        >
                            Ver Mais Trabalhos
                        </motion.button>
                    </motion.div>
                </div>
            </section>
            {/* Depoimentos */}
            <section className="py-24 bg-[#221E1F]">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl font-bold text-[#FFF100] mb-4"
                        >
                            O Que Dizem Nossos Clientes
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-gray-300 text-lg max-w-2xl mx-auto"
                        >
                            A satisfação dos nossos clientes é o nosso maior reconhecimento
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image || `/avatar${index + 1}.jpg`}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-[#221E1F]">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#FFF100] fill-[#FFF100]' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700">{testimonial.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contato Atualizado */}
            <section id="contato" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl font-bold text-[#221E1F]">
                                Entre em Contato
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Estamos prontos para atender sua necessidade com a melhor solução técnica.
                            </p>

                            {/* Informações de Contato */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 text-gray-600">
                                    <div className="w-12 h-12 bg-[#221E1F] text-[#FFF100] rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#221E1F]">(44) 2101-7800</p>
                                        <p className="text-sm">Segunda a Sexta, 8h-18h</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 text-gray-600">
                                    <div className="w-12 h-12 bg-[#221E1F] text-[#FFF100] rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#221E1F]">contato@motopar.com.br</p>
                                        <p className="text-sm">Retorno em até 24h</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 text-gray-600">
                                    <div className="w-12 h-12 bg-[#221E1F] text-[#FFF100] rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#221E1F]">Rua Estados Unidos, 1035</p>
                                        <p className="text-sm">Jardim Internorte - Maringá/PR</p>
                                    </div>
                                </div>
                            </div>
                            {/* Mapa */}
                            <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.5721716421647!2d-51.9421697!3d-23.4012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecd0f8f9f9f9f9%3A0x9f9f9f9f9f9f9f9f!2sMotopar!5e0!3m2!1spt-BR!2sbr!4v1621621621621!5m2!1spt-BR!2sbr"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Formulário */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-xl shadow-lg"
                        >
                            <div className="text-center space-y-6">
                                <div className="bg-[#25D366] w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
                                    <svg
                                        className="w-10 h-10 fill-white"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.87 22l4.14-1.07C8.68 21.62 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.74 0-3.41-.47-4.87-1.35l-.35-.21-3.65.96.97-3.65-.22-.35C2.97 14.33 2.5 13.23 2.5 12 2.5 6.76 6.76 2.5 12 2.5S21.5 6.76 21.5 12 17.24 21.5 12 21.5z" />
                                    </svg>
                                </div>

                                <h3 className="text-3xl font-bold text-[#221E1F]">
                                    Solicite um Orçamento Via WhatsApp
                                </h3>

                                <p className="text-gray-600 text-lg max-w-md mx-auto">
                                    Atendimento rápido e personalizado direto no seu WhatsApp.
                                    Nossa equipe está pronta para te atender!
                                </p>

                                <div className="space-y-4">
                                    <motion.a
                                        href="https://wa.me/5544998377117?text=Olá! Gostaria de solicitar um orçamento para retífica de motor."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition transform w-full"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <svg
                                            className="w-6 h-6 fill-current mr-2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.87 22l4.14-1.07C8.68 21.62 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.74 0-3.41-.47-4.87-1.35l-.35-.21-3.65.96.97-3.65-.22-.35C2.97 14.33 2.5 13.23 2.5 12 2.5 6.76 6.76 2.5 12 2.5S21.5 6.76 21.5 12 17.24 21.5 12 21.5z" />
                                        </svg>
                                        Iniciar Conversa
                                    </motion.a>

                                    <p className="text-sm text-gray-500">
                                        Clique no botão acima para iniciar uma conversa no WhatsApp
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-6 mt-6">
                                    <div className="flex items-center justify-center space-x-2 text-[#221E1F]">
                                        <Clock className="w-5 h-5" />
                                        <span>Atendimento de Segunda a Sexta, 8h-18h</span>
                                    </div>
                                </div>
                                {/* Benefícios */}
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    {[
                                        {
                                            icon: <Clock className="w-5 h-5" />,
                                            text: "Resposta Rápida"
                                        },
                                        {
                                            icon: <CheckCircle className="w-5 h-5" />,
                                            text: "Orçamento Detalhado"
                                        },
                                        {
                                            icon: <Shield className="w-5 h-5" />,
                                            text: "Atendimento Profissional"
                                        },
                                        {
                                            icon: <Star className="w-5 h-5" />,
                                            text: "Melhor Custo-Benefício"
                                        }
                                    ].map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 text-gray-600"
                                        >
                                            <div className="text-[#25D366]">
                                                {benefit.icon}
                                            </div>
                                            <span className="text-sm">{benefit.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer Atualizado */}
            <footer className="bg-[#221E1F] text-white">
                {/* Seção Principal do Footer */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-4 gap-12">
                        {/* Coluna 1 - Sobre */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src="/images/logomarca.png"
                                    alt="Motopar Logo"
                                    className="h-12 mb-4"
                                />
                                <p className="text-gray-400">
                                    Mais de 40 anos de experiência em retífica de motores,
                                    sendo referência em tecnologia e qualidade no Paraná.
                                </p>
                                <div className="flex space-x-4 mt-6">
                                    {[
                                        { icon: "facebook", href: "#" },
                                        { icon: "instagram", href: "#" },
                                        { icon: "youtube", href: "#" },
                                        { icon: "linkedin", href: "#" }
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            className="w-10 h-10 bg-[#FFF100]/10 rounded-full flex items-center justify-center hover:bg-[#FFF100] transition-colors group"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <img
                                                src={`/icons/${social.icon}.svg`}
                                                alt={social.icon}
                                                className="w-5 h-5 group-hover:filter-none transition-all"
                                            />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Coluna 2 - Serviços */}
                        <div>
                            <h4 className="text-[#FFF100] font-bold text-lg mb-6">Nossos Serviços</h4>
                            <ul className="space-y-3">
                                {[
                                    "Retífica de Motores",
                                    "Injeção Eletrônica",
                                    "Bomba Injetora",
                                    "Laboratório Diesel",
                                    "Diagnóstico Técnico",
                                    "Peças e Componentes"
                                ].map((service, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >

                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-[#FFF100] transition-colors flex items-center group"
                                        >
                                            <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {service}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        {/* Coluna 3 - Contato */}
                        <div>
                            <h4 className="text-[#FFF100] font-bold text-lg mb-6">Informações de Contato</h4>
                            <ul className="space-y-4">
                                {[
                                    {
                                        icon: <Phone className="w-5 h-5" />,
                                        info: "(44) 2101-7800",
                                        subInfo: "Segunda a Sexta, 8h-18h"
                                    },
                                    {
                                        icon: <Mail className="w-5 h-5" />,
                                        info: "contato@motopar.com.br",
                                        subInfo: "Atendimento em até 24h"
                                    },
                                    {
                                        icon: <MapPin className="w-5 h-5" />,
                                        info: "Rua Estados Unidos, 1035",
                                        subInfo: "Jardim Internorte - Maringá/PR"
                                    }
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-10 h-10 bg-[#FFF100]/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-white">{item.info}</p>
                                            <p className="text-gray-400 text-sm">{item.subInfo}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Coluna 4 - Newsletter */}
                        <div>
                            <h4 className="text-[#FFF100] font-bold text-lg mb-6">Newsletter</h4>
                            <p className="text-gray-400 mb-4">
                                Receba novidades e conteúdos exclusivos sobre o mundo automotivo
                            </p>
                            <form className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Seu e-mail"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFF100] transition"
                                />
                                <motion.button
                                    type="submit"
                                    className="w-full bg-[#FFF100] text-[#221E1F] py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Inscrever-se
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Barra de Copyright */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} Motopar Retífica de Motores. Todos os direitos reservados.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a href="#" className="text-gray-400 hover:text-[#FFF100] text-sm transition">
                                    Política de Privacidade
                                </a>
                                <a href="#" className="text-gray-400 hover:text-[#FFF100] text-sm transition">
                                    Termos de Uso
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer >
            {/* Elementos Flutuantes */}
            {/* WhatsApp Button */}
            <motion.a
                href="https://wa.me/5544998377117"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-24 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition group"
                >
                    <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.87 22l4.14-1.07C8.68 21.62 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.74 0-3.41-.47-4.87-1.35l-.35-.21-3.65.96.97-3.65-.22-.35C2.97 14.33 2.5 13.23 2.5 12 2.5 6.76 6.76 2.5 12 2.5S21.5 6.76 21.5 12 17.24 21.5 12 21.5z" />
                    </svg>
                </motion.div>
            </motion.a>

            {/* Botão Voltar ao Topo */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 left-8 z-50 bg-[#221E1F] text-[#FFF100] p-4 rounded-full shadow-lg hover:shadow-xl transition group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronRight className="w-6 h-6 rotate-[-90deg] group-hover:translate-y-[-2px] transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Indicador de Progresso */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#FFF100] origin-left z-50"
                style={{
                    scaleX: scrollProgress
                }}
            />
        </div >
    );
}

export default MotoparLanding;