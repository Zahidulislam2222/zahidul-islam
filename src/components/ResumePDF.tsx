/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';
import { portfolioConfig } from "@/config/portfolio.config";

// 1. REGISTER FONTS
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helvetica/v1/Helvetica.ttf' },
        { src: 'https://fonts.gstatic.com/s/helvetica/v1/Helvetica-Bold.ttf', fontWeight: 'bold' },
        { src: 'https://fonts.gstatic.com/s/helvetica/v1/Helvetica-Oblique.ttf', fontStyle: 'italic' }
    ]
});

// 2. STYLES
const styles = StyleSheet.create({
    page: {
        padding: 40, // More breathing room
        backgroundColor: '#FFFFFF',
        color: '#334155',
        fontFamily: 'Helvetica',
        fontSize: 10, // Slightly larger base size for readability
        lineHeight: 1.5, // Increased to prevent overlapping lines
    },

    // --- HEADER FIXES ---
    header: {
        marginBottom: 25,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    name: {
        fontSize: 26, // Large
        fontWeight: 'bold',
        color: '#0e7490',
        textTransform: 'uppercase',
        marginBottom: 6, // Pushes the Role down
        lineHeight: 1, // Fixes the "Name too down" or overlapping issue
    },
    role: {
        fontSize: 11,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 12, // Pushes Contact Info down
        fontWeight: 'bold',
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12, // Consistent gap between items
        fontSize: 9,
        color: '#475569',
    },
    link: {
        color: '#0891b2',
        textDecoration: 'none',
    },

    // --- SECTION FIXES ---
    section: {
        marginBottom: 20, // Space between major sections
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        marginBottom: 10, // Space between Title and Content
        borderLeftWidth: 3,
        borderLeftColor: '#06b6d4',
        paddingLeft: 8,
    },

    // --- SKILLS GRID ---
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillCategory: {
        width: '50%', // Strict 2-column
        marginBottom: 12,
        paddingRight: 10,
    },
    skillCatTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#334155',
        marginBottom: 4,
    },
    skillText: {
        fontSize: 9,
        color: '#64748b',
        lineHeight: 1.4,
    },

    // --- PROJECT FIXES ---
    // THIS IS THE CRITICAL FIX FOR PAGE BREAKS
    projectContainer: {
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f1f5f9',
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    projectTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    projectLinks: {
        flexDirection: 'row',
        gap: 10,
    },
    projectDesc: {
        fontSize: 10,
        color: '#475569',
        marginBottom: 6,
        lineHeight: 1.4,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingLeft: 5,
    },
    bulletDot: {
        width: 10,
        fontSize: 14, // Larger dot
        color: '#06b6d4',
        lineHeight: 0.7, // Fix alignment of dot
    },
    bulletText: {
        flex: 1,
        fontSize: 9,
        color: '#475569',
    },
    techStack: {
        fontSize: 8,
        color: '#94a3b8',
        marginTop: 6,
        fontStyle: 'italic',
    },

    // --- CERTIFICATIONS ---
    certItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
});

const config: any = portfolioConfig;

// Helper to clean URLs
const cleanUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
};

export const ResumePDF = () => {
    const { personal, socials } = config;

    return (
        <Document
            title={`${personal.name} - Resume`}
            author={personal.name}
        >
            <Page size="A4" style={styles.page}>

                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personal.name}</Text>
                    <Text style={styles.role}>{personal.title}</Text>

                    <View style={styles.contactRow}>
                        <Text>{personal.location}</Text>
                        <Text style={{ color: '#cbd5e1' }}>|</Text>
                        <Link src={socials.email.startsWith('mailto:') ? socials.email : `mailto:${socials.email}`} style={styles.link}>
                            {personal.email}
                        </Link>
                        <Text style={{ color: '#cbd5e1' }}>|</Text>
                        <Link src={socials.linkedin} style={styles.link}>
                            {cleanUrl(socials.linkedin)}
                        </Link>
                        <Text style={{ color: '#cbd5e1' }}>|</Text>
                        <Link src={socials.github} style={styles.link}>
                            github.com/{cleanUrl(socials.github).split('/').pop()}
                        </Link>
                        {personal.phone && (
                            <>
                                <Text style={{ color: '#cbd5e1' }}>|</Text>
                                <Text>{personal.phone}</Text>
                            </>
                        )}
                    </View>
                </View>

                {/* SUMMARY */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Professional Summary</Text>
                    <Text style={{ ...styles.skillText, fontSize: 10 }}>
                        {personal.bio || personal.shortBio}
                    </Text>
                </View>

                {/* SKILLS */}
                {config.skillCategories && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Expertise</Text>
                        <View style={styles.skillsGrid}>
                            {config.skillCategories.map((cat: any, index: number) => (
                                // wrap={false} ensures a category doesn't split awkwardly
                                <View key={index} style={styles.skillCategory} wrap={false}>
                                    <Text style={styles.skillCatTitle}>{cat.category}</Text>
                                    <Text style={styles.skillText}>
                                        {cat.skills.map((s: any) => s.name).join(', ')}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* PROJECTS */}
                {config.projects && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Projects</Text>
                        {config.projects.slice(0, 5).map((project: any, index: number) => (
                            // FIX: wrap={false} forces the WHOLE project card to move to next page
                            // if it doesn't fit at the bottom of the current page.
                            <View key={index} style={styles.projectContainer} wrap={false}>

                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectTitle}>{project.title}</Text>
                                    <View style={styles.projectLinks}>
                                        {project.liveUrl && (
                                            <Link src={project.liveUrl} style={styles.link}>Live</Link>
                                        )}
                                        {project.githubUrl && (
                                            <Link src={project.githubUrl} style={styles.link}>Code</Link>
                                        )}
                                    </View>
                                </View>

                                <Text style={styles.projectDesc}>{project.description}</Text>

                                <View>
                                    {project.achievements && project.achievements.slice(0, 3).map((ach: string, i: number) => (
                                        <View key={i} style={styles.bulletPoint}>
                                            <Text style={styles.bulletDot}>•</Text>
                                            <Text style={styles.bulletText}>{ach}</Text>
                                        </View>
                                    ))}
                                </View>

                                <Text style={styles.techStack}>
                                    {project.technologies.join(' • ')}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* CERTIFICATIONS - Keep entire section together if possible */}
                {config.certifications && config.certifications.length > 0 && (
                    <View style={styles.section} wrap={false}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        {config.certifications.map((cert: any, index: number) => (
                            <View key={index} style={styles.certItem}>
                                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{cert.name}</Text>
                                <Text style={{ fontSize: 9, color: '#64748b' }}>{cert.issuer}</Text>
                            </View>
                        ))}
                    </View>
                )}

            </Page>
        </Document>
    );
};