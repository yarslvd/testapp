import React from "react";
import { Link } from "react-router-dom";

import styles from './ArticleCard.module.scss';

import {
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material'

interface ArticleProps {
    id: number;
    title: string;
    url: string;
    imageUrl: string;
    publishedAt: string;
    summary: string;
    query: string
}

const ArticleCard = ({id, title, url, imageUrl, summary, publishedAt, query}: ArticleProps) => {

    const normilizeTime = (date: string): string => {
        const normilizedDate = new Date(date);

        const day = normilizedDate.getDate();
        const month = normilizedDate.toLocaleString('en-us', { month: 'long' });
        const year = normilizedDate.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    const getHighlightedText = (text: string, highlight: any) => {
        let parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return parts.map((part, index) => (
            <React.Fragment key={index}>
              {part?.toLowerCase() === highlight?.toLowerCase() ? (
                <span style={{ backgroundColor: "#FFF619A1" }}>{part}</span>
              ) : (
                part
              )}
            </React.Fragment>
          ));
    }

    return(
        <Card sx={{ maxWidth: 400, margin: '0 auto', height: '530px' }}>
            <CardMedia
                component="img"
                alt="Image"
                height="217"
                image={imageUrl}
            />
            <CardContent className={styles.cardContent}>
                <div className={styles.date}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.66675H3.99998C2.52722 2.66675 1.33331 3.86066 1.33331 5.33341V12.0001C1.33331 13.4728 2.52722 14.6667 3.99998 14.6667H12C13.4727 14.6667 14.6666 13.4728 14.6666 12.0001V5.33341C14.6666 3.86066 13.4727 2.66675 12 2.66675Z" stroke="#363636" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.33331 1.33337V4.00004" stroke="#363636" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.6666 1.33337V4.00004" stroke="#363636" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.33331 6.66675H14.6666" stroke="#363636" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{normilizeTime(publishedAt)}</span>
                </div>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontSize={24}
                    mb={'20px'}
                    className={styles.heading}
                >
                    {title && getHighlightedText(title, query)}
                </Typography>
                <Typography
                    variant="body1"
                    mb={'20px'}
                    className={styles.description}
                >
                    {summary && getHighlightedText(summary, query)}
                </Typography>
                <Link to={`/article/${id}`} className={styles.link}>
                    <span className={styles.text}>
                        Read more
                    </span>
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.66829 0.162658C6.45593 0.379657 6.45593 0.730251 6.66975 0.945773L9.09665 3.39845L9.15268 3.448C9.36701 3.61309 9.6729 3.59589 9.86756 3.39698C9.97375 3.28848 10.0268 3.1475 10.0268 3.00653C10.0268 2.86407 9.97375 2.72236 9.86611 2.61386L7.43993 0.161182L7.38388 0.111806C7.16946 -0.0527212 6.86296 -0.0355811 6.66829 0.162658ZM0.477064 4.45064C0.208215 4.48481 0 4.71782 0 4.99989C0 5.30546 0.244364 5.55346 0.545455 5.55346H10.1338L6.66982 9.05423L6.62082 9.11077C6.45747 9.32725 6.4737 9.63843 6.66836 9.83734C6.88073 10.0536 7.22618 10.0543 7.43927 9.83882L11.8393 5.39182L11.8878 5.33613C11.9616 5.23874 12 5.11983 12 4.99989C12 4.92829 11.9862 4.8567 11.9585 4.78879C11.8742 4.58139 11.6756 4.44632 11.4545 4.44632H0.545455L0.477064 4.45064Z" fill="#363636"/>
                    </svg>
                </Link>
            </CardContent>
        </Card>
    );
}

export default ArticleCard;