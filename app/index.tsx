import News from "../components/News";
import Search from "../components/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet } from "react-native";

const API_KEY = '0f61c1d751a04591953a72fe7c1af538'
const BASE_URL = 'https://newsapi.org/v2/everything'

type article = {
    source: {
        id: string | null,
        name: string
    };
    author: string | null,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

const index = () => {
    const [news, setNews] = useState<article[]>([])
    const [loading, setLoading] = useState(true)

    const featch = async (query = '') => {
        try {
            setLoading(true)
            const response = await axios.get(BASE_URL, {
                params: {
                    q: query || 'general',
                    apiKey: API_KEY,
                }
            })
            setNews(response.data.articles)
        } catch (error) {
            console.error('Erro ao Buscar: ', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        featch()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Search onSearch={featch} />
            {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : (
                <ScrollView>
                    {news.map((article, index) => (
                        <News key={index} image={article.urlToImage} title={article.title} description={article.description} date={new Date(article.publishedAt).toLocaleDateString()} />
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    }
})

export default index;