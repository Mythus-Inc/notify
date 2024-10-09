import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import CpfValidation from "../../validation/cpfValidation";
import "./register.css";

const Register = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [siape, setSiape] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isCpfValid, setIsCpfValid] = useState(false);
    const [isCpfFocused, setIsCpfFocused] = useState(false);

    useEffect(() => {
        const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
        const isFormFilled =
            name &&
            cpf &&
            siape &&
            position &&
            email &&
            phone &&
            password &&
            confirmPassword &&
            isPasswordValid &&
            password === confirmPassword;
        setIsFormValid(isFormFilled);
    }, [
        name,
        cpf,
        siape,
        email,
        phone,
        password,
        confirmPassword,
        passwordCriteria,
    ]);

    const handleRegister = () => {
        console.log("Oi");
        // eslint-disable-next-line no-unused-expressions
        fetch("http://localhost:8080/api/user", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name: name,
                cpf: cpf,
                siape: siape,
                position: position,
                email: email,
                phone: phone,
                password: password
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
    };

    const header = <div className="font-bold mb-3">Informe a Senha</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Obrigatório:</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li
                    className={
                        passwordCriteria.hasLowerCase ? "text-green-500" : "text-red-500"
                    }
                >
                    Ao menos uma letra minúscula
                </li>
                <li
                    className={
                        passwordCriteria.hasUpperCase ? "text-green-500" : "text-red-500"
                    }
                >
                    Ao menos uma letra maiúscula
                </li>
                <li
                    className={
                        passwordCriteria.hasNumber ? "text-green-500" : "text-red-500"
                    }
                >
                    Ao menos um número
                </li>
                <li
                    className={
                        passwordCriteria.hasSpecialChar ? "text-green-500" : "text-red-500"
                    }
                >
                    Ao menos um caractere especial
                </li>
                <li
                    className={
                        passwordCriteria.minLength ? "text-green-500" : "text-red-500"
                    }
                >
                    Mínimo de 6 caracteres
                </li>
            </ul>

        </>
    );

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordCriteria({
            minLength: newPassword.length >= 6,
            hasUpperCase: /[A-Z]/.test(newPassword),
            hasLowerCase: /[a-z]/.test(newPassword),
            hasNumber: /[0-9]/.test(newPassword),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-\\]/.test(newPassword), // O '\\' é necessario para não ficar como palavra reservada.
        });
    };

    const handlePasswordConfirmation = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
        if (password !== confirmPassword) {
            setErrorMessage("As senhas devem ser iguais.");
        } else {
            setErrorMessage("");
        }
    };

    const handleCpfChange = (e) => {
        const novoCpf = e.target.value;
        setCpf(novoCpf);
        setIsCpfValid(CpfValidation(novoCpf));
    }

    const handleFieldFocus = (field) => {
        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [field]: false,
        }));
    };

    const handleFieldBlur = (field, value) => {
        if (!value) {
            setFieldErrors((prevErrors) => ({
                ...prevErrors,
                [field]: true,
            }));
        }
    };

    return (
        <div className="
            register
            flex
            min-h-screen
            align-items-center
            justify-content-center">
            <Card title="Registro" className="
                register-container
                grid
                align-items-center
                justify-content-center
                text-center">
                <p className="sub-title font-bold">Ingresse no Notify IFPR:</p>
                <div className="
                    container-grid
                    grid
                    justify-content-center">
                    <div className="
                        grid-item
                        col-4">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <InputText
                                value={name}
                                id="name"
                                name="name"
                                autoComplete="name"
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => handleFieldFocus("Nome")}
                                onBlur={() => handleFieldBlur("Nome", name)}
                                required
                                className={`
                                    w-full ${fieldErrors.name ? "p-invalid" : ""}`}/>
                            <label htmlFor="name">Nome</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        grid-item
                        col-4">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <InputMask
                                value={cpf}
                                id="cpf"
                                name="cpf"
                                mask="999.999.999-99"
                                onChange={handleCpfChange}
                                onFocus={() => {
                                    handleFieldFocus("CPF");
                                    setIsCpfFocused(true);
                                }}
                                onBlur={() => handleFieldBlur("CPF", cpf)}
                                keyfilter="int"
                                required
                                invalid={isCpfFocused && !isCpfValid}
                                className={`
                                    w-full
                                    ${fieldErrors.cpf ? "p-invalid" : ""}`}
                            />
                            <label htmlFor="cpf">CPF</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        grid-item
                        col-4">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <InputMask
                                value={siape}
                                id="siape"
                                name="siape"
                                mask="9999999"
                                onChange={(e) => setSiape(e.target.value)}
                                onFocus={() => handleFieldFocus("SIAPE")}
                                onBlur={() => handleFieldBlur("SIAPE", siape)}
                                keyfilter="int"
                                required
                                className={`
                                    w-full ${fieldErrors.phone ? "p-invalid" : ""}`}/>
                            <label htmlFor="siape">SIAPE</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        grid-item
                        col-4">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <InputMask
                                value={phone}
                                id="phone"
                                name="phone"
                                autoComplete="phone"
                                mask="(99) 99999-9999"
                                onChange={(e) => setPhone(e.target.value)}
                                onFocus={() => handleFieldFocus("Telefone")}
                                onBlur={() => handleFieldBlur("Telefone", phone)}
                                keyfilter="int"
                                required
                                className={`
                                    w-full ${fieldErrors.phone ? "p-invalid" : ""}`}/>
                            <label htmlFor="phone">Telefone</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        grid-item
                        col-4">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <InputText
                                value={position}
                                id="position"
                                name="position"
                                onChange={(e) => setPosition(e.target.value)}
                                onFocus={() => handleFieldFocus("Cargo")}
                                onBlur={() => handleFieldBlur("Cargo", position)}
                                required
                                className={`
                                    w-full ${fieldErrors.position ? "p-invalid" : ""}`}
                            />
                            <label htmlFor="position">Cargo</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        grid-item
                        col-4">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <InputText
                                value={email}
                                id="email"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => handleFieldFocus("Email")}
                                onBlur={() => handleFieldBlur("Email", email)}
                                keyfilter="email"
                                required
                                className={`
                                    w-full ${fieldErrors.email ? "p-invalid" : ""}`}/>
                            <label htmlFor="email">Email</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        password-area
                        grid-item
                        col-6">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <Password
                                value={password}
                                id="password"
                                name="password"
                                onChange={handlePasswordChange}
                                onFocus={() => {
                                    handleFieldFocus("Senha");
                                    setIsPasswordFocused(true);
                                }}
                                onBlur={() => handleFieldBlur("Senha", password)}
                                inputStyle={{ width: "100%" }}
                                toggleMask
                                header={header}
                                footer={footer}
                                invalid={
                                    isPasswordFocused &&
                                    !Object.values(passwordCriteria).every(Boolean)
                                }
                                className={`
                                    w-full
                                    ${fieldErrors.password ? "p-invalid" : ""}`}/>
                            <label htmlFor="password">Senha</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        grid-item
                        col-6">
                        <FloatLabel className="
                            password-area
                            w-full
                            mb-5">
                            <Password
                                value={confirmPassword}
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handlePasswordConfirmation}
                                onFocus={() => handleFieldFocus("Confirme a Senha")}
                                onBlur={() =>
                                    handleFieldBlur("Confirme a Senha", confirmPassword)
                                }
                                inputStyle={{ width: "100%" }}
                                toggleMask
                                feedback={false}
                                required
                                className={`
                                    w-full
                                    ${fieldErrors.confirmPassword ? "p-invalid" : ""}`}/>
                            <label htmlFor="confirmPassword">Confirme a Senha</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        col-12">
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                    <div className="
                        grid-item
                        col-12">
                        <Button
                            label="Criar Conta"
                            id="register-button"
                            className={`
                                w-18rem
                                mb-4
                                ${isFormValid? "bg-green-600 border-green-600":"bg-gray-500 border-gray-500"}
                            `}
                            disabled={!isFormValid}
                            onClick={handleRegister}
                        />
                    </div>
                    <div className="
                        grid-item
                        col-4">
                        <Button
                            label="Voltar"
                            id="back-button"
                            className="
                                w-full
                                mb-4"
                            link
                            onMouseOver={({target})=>target.style.color="var(--back-button-over-color)"}
                            onMouseOut={({target})=>target.style.color="var(--back-button-out-color)"}
                            onClick={handleGoBack}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Register;
