import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

type SearchProps = {
    onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
    const [query, setQuery] = useState('')

    const handlSearch = () => {
        onSearch(query)
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Search News" value={query} onChangeText={setQuery} />
            <Button title="Search" onPress={handlSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
    }
})

export default Search;