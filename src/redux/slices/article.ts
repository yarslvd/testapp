import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface fetchArticlesTypes {
    page: number;
    query?: string | null;
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({page, query}: fetchArticlesTypes, {rejectWithValue}: any) => {
    try {
        let apiResponse, jsonArticles;
        if(query === null) {
            apiResponse = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=12&_start=${page}`);
            jsonArticles = await apiResponse.json();
        }
        else {
            apiResponse = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=12&title_contains=${query}&_start=${page}&summary_ne=${query}`);

            jsonArticles = await apiResponse.json();
            console.log(jsonArticles);
            if(jsonArticles.length < 12 && jsonArticles.length !== 0) {
                let ff = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${12 - jsonArticles.length}&summary_contains=${query}&_start=${0}&title_ne=${query}`);
                jsonArticles = jsonArticles.concat(await ff.json());
            }
            if(jsonArticles.length === 0) {
                const data2 = await fetch(`https://api.spaceflightnewsapi.net/v3/articles/count?title_contains=${query}`);
                const json2: number = await data2.json();
                console.log(page - json2);
                console.log(`https://api.spaceflightnewsapi.net/v3/articles?_limit=12&summary_contains=${query}&_start=${page - json2}`);
                apiResponse = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=12&summary_contains=${query}&_start=${page - json2}`);
                jsonArticles = await apiResponse.json();
                console.log(jsonArticles);
            }
        }

        return jsonArticles;
    }
    catch(err: any) {
        return rejectWithValue(err.response.data);
    }
});

interface articleState {
    items: any;
    status: string;
}

const initialState: articleState = {
    items: [],
    status: 'loading'
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state: articleState) => {
                state.status =  'loading';
            })
            .addCase(fetchArticles.fulfilled, (state: articleState, action) => {
                state.status = 'resolved';
                state.items = action.payload;
            })
            .addCase(fetchArticles.rejected, (state: articleState) => {
                state.status = 'rejected';
            })
    }
});

export const articlesReducer = articleSlice.reducer;