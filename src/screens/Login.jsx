import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/UserSlice";
import { useDB } from "../persistence/useDB";
import { colors } from "../global/colors";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch()

  const [triggerSignIn, result] = useSignInMutation()

  const { insertSession } = useDB();

  useEffect(()=> {
    if (result?.data && result.isSuccess) {
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken,
      })
        dispatch(
          setUser({
            email: result.data.email,
            idToken: result.data.idToken,
            localId: result.data.localId,
          })
        );
    }
  }, [result]) 

  const onSubmit = () => {
    triggerSignIn({ email, password, returnSecureToken: true })
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <InputForm label={"Email"} onChange={setEmail} error={""} />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={""}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Enviar" />
        <Text style={styles.sub}>¿No tienes una cuenta?</Text>

        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Registrarme</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.ligthBlue
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 15,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c1c1c1"
  },
  title: {
    fontSize: 25,
    fontFamily: "Bebas-regular",
    color: colors.p_black
  },
  sub: {
    fontSize: 14,
    color: "black",
    fontFamily: "Kanit-regular",
    color: colors.p_black
  },
  subLink: {
    fontSize: 14,
    color: "#1097E9",
    fontFamily: "Kanit-regular",
  },
});