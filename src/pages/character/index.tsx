import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { characters } from "../../api/characters";
import { ICharacter } from "./interfaces/character.interface";

const CharacterPage: React.FC = () => {
  const { id } = useParams();
  const idNumber: number = Number(id);

 
  

  const [loading, setLoading] = React.useState<boolean>(true);
  const [character, setCharacter] = React.useState<ICharacter | null>(null);
  React.useEffect(() => {
    characters
      .getById({ id: idNumber  })
      .then((r) => {
        setCharacter(r.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [idNumber]);

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="xl">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid sx={{ mt: 2 }} container columnSpacing={2}>
            <Grid item xs={6}>  
              <Typography variant="h1">{character!.name}</Typography>
              <Divider />
              <Typography variant="h6">{character!.origin.name}</Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  color="primary"
                  variant="outlined"
                  label={character!.status}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <img
                src={character!.image}
                style={{ width: "100%", borderRadius: "0.5em" }}
                alt={character!.name}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};


export default CharacterPage;