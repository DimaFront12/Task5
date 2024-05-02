import Styles from './WindowWithForm.module.css';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const fieldsSchema = yup.object().shape({
	email: yup.string()
		.matches(
			/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
			'Некорректно введена почта. При вводе почты должны быть символы "@" и "."',
		)
		.required('Поле обязательно для заполнения'),
	password: yup.string()
		.min(9, 'Пароль должен быть больше 8 символов')
		.required('Поле обязательно для заполнения'),
	repeatPassword: yup.string()
		.required('Поле обязательно для заполнения')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const WindowWithForm = () => {
	const [typeInputPass, setTypeInputPass] = useState('password');
	const [typeInputRepPass, setTypeInputRepPass] = useState('password');

	const submitFormRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
	})

	const errorEmail = errors.email?.message;
	const errorPassword = errors.passwordg?.message;
	const errorRepeatPassword = errors.repeatPassword?.message;


	const changeTypeInputPass = (evt) => {
		evt.preventDefault();
		setTypeInputPass(typeInputPass === 'password' ? 'text' : 'password');
	};

	const changeTypeInputRepPass = (evt) => {
		evt.preventDefault();
		setTypeInputRepPass(typeInputRepPass === 'password' ? 'text' : 'password');
	};

	const getData = (formData) => {
		console.log(formData)
	};

	const onChange = ({ target }) => {
		if (
			!errorEmail &&
			!errorPassword &&
			target.value === "1"
		) {
			submitFormRef.current.focus();
		}
	};

	return (
		<div className={Styles.rectangle}>
			<p className={Styles.register}>Регистрация</p>
			<form className={Styles['reg-form']} onSubmit={handleSubmit(getData)}>
				<label className={Styles['reg-form__label']}>
					<p className={Styles['reg-form__text']}>Почта</p>
					<input
						className={Styles['reg-form__email']}
						name="email"
						type="email"
						placeholder="Почта"
						{...register("email")}
					></input>
					{errorEmail && (
						<p className={Styles['reg-form__error']}>{errorEmail}</p>
					)}
				</label>
				<label className={Styles['reg-form__label']}>
					<p className={Styles['reg-form__text']}>Пароль</p>
					<div className={Styles['reg-form__showPassword']}>
						<input
							className={Styles['reg-form__password']}
							name="password"
							type={typeInputPass}
							placeholder="Пароль"
							{...register("password")}
						></input>
						<button
							className={Styles['reg-form__show']}
							onClick={changeTypeInputPass}
						></button>
					</div>
					{errorPassword && (
						<p className={Styles['reg-form__error']}>{errorPassword}</p>
					)}
				</label>
				<label className={Styles['reg-form__label']}>
					<p className={Styles['reg-form__text']}>Повторите пароль</p>
					<div className={Styles['reg-form__showPassword']}>
						<input
							className={Styles['reg-form__password']}
							name="repeatPassword"
							type={typeInputRepPass}
							placeholder="Повторите пароль"
							onChange={onChange}
							{...register("repeatPassword")}
						></input>
						<button
							className={Styles['reg-form__show']}
							onClick={changeTypeInputRepPass}
						></button>
					</div>
					{errorRepeatPassword && (
						<p className={Styles['reg-form__error']}>{errorRepeatPassword}</p>
					)}
				</label>
				<button
					ref={submitFormRef}
					type="submit"
					className={Styles['reg-form__button']}
					disabled={errorEmail || errorPassword || errorRepeatPassword}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
