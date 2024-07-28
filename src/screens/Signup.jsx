import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { colors } from "../global/colors";
import SubmitButton from "../components/SubmitButton";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/UserSlice";
import { signupSchema } from "../validations/singUpSchema";
import { Colors } from "react-native/Libraries/NewAppScreen";


const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch()
  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      )
    }
  }, [result])

  const onSubmit = () => {
    // logica de registro
    try {
      setErrorMail("")
      setErrorPassword("")
      setErrorConfirmPassword("")
      
      signupSchema.validateSync({ email, password, confirmPassword })
      
      triggerSignUp({ email, password, returnSecureToken: true })

    } catch (err) {

      console.log("Entro al sigunp del error");
      console.log(err.path);
      console.log(err.message);

      switch (err.path) {
        case "email":
          setErrorMail(err.message)
        case "password":
          setErrorPassword(err.message);
        case "confirmPassword":
          setErrorConfirmPassword(err.message)
        default:
          break;
      }
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrarme</Text>
        <InputForm
          label={"Email"}
          onChange={setEmail}
          error={errorMail}
        />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"Confirmar contraseña"}
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Enviar" />
        <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Iniciar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    backgroundColor: colors.ligthBlue
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 15,
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c1c1c1"
  },
  title: {
    fontSize: 25,
    fontFamily: "Bebas-regular",
    color: colors.p_black,

  },
  sub: {
    fontSize: 14,
    fontFamily: "Kanit-regular",
    color: colors.p_black,
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Kanit-regular",
    color: "#1097E9",
  },
});