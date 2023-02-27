import React from "react";
import { Box, Button, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import { CardComponent, HeaderComponent } from "../../components";
import { characters } from "../../api/characters";
import { TypeCharacter } from "./interface/character.interface";

export const HomePage: React.FC = () => {
  const [page, setPage] = React.useState(1)
  const [count, setCount] = React.useState(1)
  const [allCharacters, setAllCharacters] = React.useState<
    TypeCharacter[] | null
  >(null);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);  
    characters
      .getAll({ page })
      .then((r) => {
        setCount(r.data.info.pages)
        setAllCharacters(r.data.results);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Container maxWidth="xl">
      <HeaderComponent
        title="Hola mundo"
        description="Hola mundo bienvenido a Codrr"
        element={
          <Button fullWidth variant="contained">
            Hola mundo
          </Button>
        }
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", nt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
        <div>
          {allCharacters?.length !== 0 ? (
            <Grid sx={{ my: 2}} container spacing={2} direction="row">
              {allCharacters!.map((character) => (
                <Grid item xs={3}>
                  <CardComponent
                    key={character.id}
                    image={character.image}
                    name={character.name}
                    species={character.species}
                    status={character.status}
                    id={character.id}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            ""
          )}
        </div>
        <Box sx={{width:"100%", display:"flex", justifyContent:"center"}}>
        <Pagination sx={{mb:3}} variant="outlined" count={count} page={page} onChange={handleChange} size="large"/>
        </Box>
        </>

      )}
    </Container>
  );
};
