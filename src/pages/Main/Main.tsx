import React, { useEffect, useState, ChangeEvent } from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

import styles from './Main.module.scss';

import {
    Grid,
    Divider,
    Pagination
} from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'

import { fetchArticles } from "../../redux/slices/article";
import { useFetchApi } from '../../hooks/useFetchApi';
import { fetchArticlesTypes } from "../../redux/slices/article";
import Layout from '../../components/Layout/Layout';

const Main = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataPresent, setDataPresent] = useState<boolean>(false);
    const [pagesNumber, setPagesNumber] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>();
    const [articlesNumber, setArticlesNumber] = useState<number>(0);

    const dispatch = useDispatch<any>();
    const articles = useSelector((state: any) => state.articles.items);

    const { data } = useFetchApi('https://api.spaceflightnewsapi.net/v3/articles/count');

    useEffect(() => {
        if(!dataPresent) {
            const obj: fetchArticlesTypes = {
                page: 0,
                query: null
            }
            dispatch(fetchArticles(obj));
            setDataPresent(true);
        }
    }, []);

    useEffect(() => {
        setPagesNumber(Math.ceil(data / 12));
        setArticlesNumber(data);
    }, [data]);

    useEffect(() => {
        if(searchQuery) {
            const obj: fetchArticlesTypes = {
                page: 0,
                query: searchQuery
            }
            dispatch(fetchArticles(obj));
            setCurrentPage(1);
    
            const pages = async() => {
                const data1 = await fetch(`https://api.spaceflightnewsapi.net/v3/articles/count?title_contains=${searchQuery}`);
                const json1: number = await data1.json();
                const data2 = await fetch(`https://api.spaceflightnewsapi.net/v3/articles/count?summary_contains=${searchQuery}`);
                const json2: number = await data2.json();
                setPagesNumber(Math.ceil((json1 + json2) / 12));
                setArticlesNumber(json1 + json2);
            }
            pages();
        }
    }, [searchQuery]);

    const handlePagination = (e: any, p: number) => {
        e.preventDefault();

        let page: number = 0;
        if(p > 1) {
            page = (p - 1) * 12;
        }
        setCurrentPage(page);  

        const body = document.querySelector('#root') as HTMLBodyElement;
        body.scrollIntoView({
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        if(searchQuery) {
            const obj: fetchArticlesTypes = {
                page: currentPage,
                query: searchQuery
            }
            dispatch(fetchArticles(obj));
        }
        else {
            const obj: fetchArticlesTypes = {
                page: currentPage,
                query: null
            }
            dispatch(fetchArticles(obj));
        }
    }, [currentPage]);
    

    return(
        <Layout>
            <div className={styles.filterSection}>
                <h3 className={styles.heading}>Filter by keywords</h3>
                <div className={styles.container}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7832 14.3911L20 18.6069L18.6069 20L14.3911 15.7832C12.8224 17.0407 10.8713 17.7246 8.86088 17.7218C3.96968 17.7218 0 13.7521 0 8.86088C0 3.96968 3.96968 0 8.86088 0C13.7521 0 17.7218 3.96968 17.7218 8.86088C17.7246 10.8713 17.0407 12.8224 15.7832 14.3911ZM13.8082 13.6605C15.0577 12.3756 15.7555 10.6532 15.7527 8.86088C15.7527 5.05267 12.6681 1.96909 8.86088 1.96909C5.05267 1.96909 1.96909 5.05267 1.96909 8.86088C1.96909 12.6681 5.05267 15.7527 8.86088 15.7527C10.6532 15.7555 12.3756 15.0577 13.6605 13.8082L13.8082 13.6605Z" fill="#575757"/>
                    </svg>
                    <input type="text" placeholder="Search..." className={styles.search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}/>
                </div>
            </div>
            <div className={styles.resultsSection}>
                <h3 className={styles.heading}>{`Result: ${articlesNumber}`}</h3>
                <Divider sx={{ mb: '45px' }}/>
                <Grid container spacing={2}>
                    {
                        dataPresent && articles && articles.map((el: any, index: number) => (
                            <Grid xl={4} md={6} xs={12} item={true} key={index}>
                                <ArticleCard {...el} query={searchQuery}/>
                            </Grid>
                        ))
                    }
                </Grid>
                <div style={{ margin: '0 auto' }}>
                    <Pagination count={pagesNumber} color="primary" size="large" sx={{ mt: '60px', mb: '80px', alignItems: 'center'}} onChange={handlePagination}/>
                </div>
            </div>
        </Layout>
    );
}

export default Main;