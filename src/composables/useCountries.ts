import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useCountries() {
    const countries = ref<string[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchCountries = async () => {
        loading.value = true;
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all', {
                params: { fields: 'name' },
            });
            countries.value = response.data
                .map((country: { name: { common: string } }) => country.name.common)
                .sort();
        } catch (err) {
            error.value = 'Failed to load countries';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchCountries);

    return { countries, loading, error };
}
