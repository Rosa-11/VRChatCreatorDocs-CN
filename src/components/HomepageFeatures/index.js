import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Spacer from "../Utilities/Spacer";

const FeatureList = [
    {
        title: '入门指南',
        imageUrl: require('@site/static/img/homepage/ill-overview.png').default,
        link: '/getting-started',
        description: (
            <>
                面向新手和有经验的创作者
            </>
        ),
    },
    {
        title: '世界',
        imageUrl: require('@site/static/img/homepage/ill-worlds.png').default,
        link: '/worlds',
        description: (
            <>
                构建由简单到复杂的体验和聚会地
            </>
        ),
    },
    {
        title: '虚拟形象',
        imageUrl: require('@site/static/img/homepage/ill-avatars.png').default,
        link: '/avatars',
        description: (
            <>
                通过丰富的自定义选项来展现自我
            </>
        ),
    },
];

function Feature({imageUrl, title, description, link}) {
    return (
        <div className={clsx(`col col--4 ${styles.feature}`)}>
            <div className="text--center">
                <a href={link}>
                    <img className={styles.featureImage} src={imageUrl} alt={title} />
                </a>
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p className="text--left">{description}</p>
            </div>
            <Spacer/>
            <div>
                <a href={link}><button className="button button--primary button--block">了解更多</button></a>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
