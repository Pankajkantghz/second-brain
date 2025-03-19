import axios from 'axios';
import { useEffect, useState } from 'react';
import { Backend_URL } from '../config';

export default function useContent() {
    const [contents, setContents] = useState([]);

    const refresh = () => {
        axios
            .get(`${Backend_URL}/api/v1/content`, {
                headers: { "Authorization": localStorage.getItem("token") },
            })
            .then((response) => {
                setContents(response.data.content);
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
            });
    }

    useEffect(() => {
        refresh();
        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return { contents, refresh };
}
