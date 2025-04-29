import { useState } from "react";
import api from "../api";
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
    const [about, setAbout] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/recommendations/", {
                name: name,
                preferences: about,
            });

            setResponse(res.data.text);
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
            <TextField id="about-field" label="Tell Me About Your Preferences" variant="outlined" multiline rows={5} value={about} onChange={(e) => setAbout(e.target.value)}/>
            <Button type="submit" variant="contained" color="secondary">Generate</Button>
            {loading && <LinearProgress color="secondary"/>}
            {response && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'grey.800',
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