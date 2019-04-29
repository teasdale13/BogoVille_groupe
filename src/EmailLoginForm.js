import React from 'react';

export class EmailLoginForm extends React.Component{

    render() {
        return (
            <div style={styles.allignedContainer}>
                <TextField
                    id="userName"
                    label="Nom d'usager ou Courriel"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                />
                <p>Vous avez oublié votre nom d'utilisateur?</p>
                <TextField
                    id="password"
                    label="Mot de passe"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                />
                <p>Vous avez oublié votre mot de passe?</p>
                </div>
        )
    }

}

const styles = StyleSheet.create({
    allignedContainer: {
        alignItems: 'center',
        width: '80%'
    },
    horizontalInput: {
        width: '100%',
        borderWidth:1,
        height: 25,
    },
    flexRow: {
        flexDirection:'row'
    }
});