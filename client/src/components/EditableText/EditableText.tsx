import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import styles from './EditableText.module.css';
// we should have a component here that can take in any text and allow the user to click the text
// after to modify it

function EditableText(props) {
  const [text, setText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setText(props.value);
    setOriginalText(props.value);
  }, [props.value]);

  useEffect(() => {
    if (text !== originalText) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [text, originalText]);

  const cancel = () => {
    if (!editing) return;
    setText(originalText);
    setEditing(false);
  };

  const save = () => {
    if (!editing) return;
    setEditing(false);
    setOriginalText(text);
    if (props.onSave) {
      props.onSave(text);
    }
  };

  return (
    <Box>
      <TextField
        sx={props.sx}
        variant={props.variant}
        multiline
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {editing ? (
        <Box
          display={'flex'}
          sx={{
            pt: 1,
            pr: 1,
          }}
          gap={1}
        >
          <Button onClick={save} disabled={!editing} variant="outlined">
            Save
          </Button>
          <Button onClick={cancel} disabled={!editing} variant="outlined">
            Cancel
          </Button>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
}

export default EditableText;
