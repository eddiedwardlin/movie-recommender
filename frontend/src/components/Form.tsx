import { useState } from "react";
// import api from "../api";
import ReactMarkdown from 'react-markdown'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
    title: string;
};

function Form({title}: Props) {
    const [name, setName] = useState("");
    const [preferences, setPreferences] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    // Axios code (intentionally kept)
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     setLoading(true);
    //     e.preventDefault();

    //     try {
    //         const res = await api.post("/recommendations/", {
    //             name: name,
    //             preferences: preferences,
    //         });

    //         setResponse(res.data.text);
    //     } catch (err) {
    //         alert(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/recommendations/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    preferences: preferences,
                }),
            });

            if(!res.ok) {
                throw new Error("Error: " + res.status);
            }

            const data = await res.json();

            console.log(data)

            setResponse(data.text);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 500,
            mx: 'auto',
            mt: 4,
            px: 2,
          }}>
            <Typography variant="h4">{title}</Typography>
            <TextField id="name-field" label="Movie/TV Show" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
            <TextField id="preferences-field" label="Tell Me About Your Preferences" variant="outlined" multiline rows={5} value={preferences} onChange={(e) => setPreferences(e.target.value)}/>
            <Button type="submit" variant="contained" color="secondary">Generate</Button>
            {loading && <LinearProgress color="secondary"/>}
            {response && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'grey.900',
                    }}
                >
                    <Typography variant="h6" gutterBottom>Recommendation</Typography>
                    <Box sx={{ fontFamily: 'Roboto', lineHeight: 1.5 }}>
                        <ReactMarkdown>{response}</ReactMarkdown>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default Form;