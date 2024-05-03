import Styles from './WindowWithForm.module.css';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.email('Некорректно введена почта. При вводе почты должны быть символы "@" и "."')
		.required('Поле обязательно для заполнения'),
	password: yup
		.string()
		.min(9, 'Пароль должен быть больше 8 символов')
		.required('Поле обязательно для заполнения'),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли не совпадают')
		.required('Поле обязательно для заполнения')
});

export const WindowWithForm = () => {
	const [typeInputPass, setTypeInputPass] = useState('password');
	const [typeInputRepPass, setTypeInputRepPass] = useState('password');

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
	});

	const errorEmail = errors.email?.message;
	const errorPassword = errors.password?.message;
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
		console.log(formData);
	};

	return (
		<div className={Styles.rectangle}>
			<p className={Styles.register}>Регистрация</p>
			<form className={Styles['reg-form']} onSubmit={handleSubmit(getData)}>
				<label className={Styles['reg-form__label']}>
					<p className={Styles['reg-form__text']}>Почта</p>
					<input
						className={Styles['reg-form__email']}
						type="email"
						placeholder="Почта"
						{...register('email')}
					/>
					{errorEmail && (
						<p className={Styles['reg-form__error']}>{errorEmail}</p>
					)}
				</label>
				<label className={Styles['reg-form__label']}>
					<p className={Styles['reg-form__text']}>Пароль</p>
					<div className={Styles['reg-form__showPassword']}>
						<input
							className={Styles['reg-form__password']}
							type={typeInputPass}
							placeholder="Пароль"
							{...register('password')}
						/>
						<i
							className={Styles['reg-form__show']}
							onClick={changeTypeInputPass}
						></i>
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
							type={typeInputRepPass}
							placeholder="Повторите пароль"
							{...register('repeatPassword')}
						/>
						<i
							className={Styles['reg-form__show']}
							onClick={changeTypeInputRepPass}
						></i>
					</div>
					{errorRepeatPassword && (
						<p className={Styles['reg-form__error']}>{errorRepeatPassword}</p>
					)}
				</label>
				<button
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
