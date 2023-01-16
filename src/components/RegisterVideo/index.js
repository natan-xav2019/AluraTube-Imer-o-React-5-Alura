import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js';

// Whiteboarding
// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}


const PROJECT_URL = 'https://krrpdvgrratyfvzvaycf.supabase.co';
const PUBLIC_KEY = "XluzdBorttQykKSTlvB76K/b0gUCLqI3eDfKVxSj4Dq6qzK8uVxhTJz6dGH62MpDvfdmbGd2afKSwtfm5Y9S/A==";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}


export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://youtube.." }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);
    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
        - titulo
        - url do vídeo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);
                        
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                         })
                         .then((oqueveio) => {
                            console.log(oqueveio);
                         })
                         .catch((err) => {
                            console.log(err);
                         })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input
                                placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}


// [X] Falta o botão para adicionar
// [X] Modal
// -> [X] Precisamos controlar o state
// -> Formulário em si

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycnBkdmdycmF0eWZ2enZheWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM4MjAwOTcsImV4cCI6MTk4OTM5NjA5N30.uzAh9-f9OjRZDJyxlY5eCQexV57sk8nz_cVmNoVzRNc

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycnBkdmdycmF0eWZ2enZheWNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzgyMDA5NywiZXhwIjoxOTg5Mzk2MDk3fQ.3asHG-Fyrha3hRYOgZD_Q7-8YWsXD3a8GBMd0hGLlGo

// https://krrpdvgrratyfvzvaycf.supabase.co

// XluzdBorttQykKSTlvB76K/b0gUCLqI3eDfKVxSj4Dq6qzK8uVxhTJz6dGH62MpDvfdmbGd2afKSwtfm5Y9S/A==