import { motion } from 'framer-motion';

interface SectionHeaderProps {
    label: string;
    title: string;
    description?: string;
    center?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    label,
    title,
    description,
    center = false,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: center ? 'center' : 'left', marginBottom: '3rem' }}
        >
            <p className="section-label">{label}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
            {description && (
                <p
                    className="section-desc"
                    style={{ margin: center ? '0 auto' : undefined }}
                >
                    {description}
                </p>
            )}
        </motion.div>
    );
};
