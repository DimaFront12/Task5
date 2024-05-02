import Styles from './WindowWithForm.module.css';
import { useRef, useState } from 'react';
import { useStore } from '../../store/useStore';

export const WindowWithForm = () => {
	const { getState, updateState } = useStore();
	const { email, password, repeatPassword } = getState();
	const [errorEmail, setErrorEmail] = useState('');
	const [errorPassword, setErrorPassword] = useState('');
	const [errorRepeatPassword, setErrorRepeatPassword] = useState('');
	const [errorSubmit, setErrorSubmit] = useState('');
	const [typeInputPass, setTypeInputPass] = useState('password');
	const [typeInputRepPass, setTypeInputRepPass] = useState('password');

	const submitFormRef = useRef(null);

	const changeTypeInputPass = (evt) => {
		evt.preventDefault();
		setTypeInputPass(typeInputPass === 'password' ? 'text' : 'password');
	};

	const changeTypeInputRepPass = (evt) => {
		evt.preventDefault();
		setTypeInputRepPass(typeInputRepPass === 'password' ? 'text' : 'password');
	};

	const onSubmit = (evt) => {
		evt.preventDefault();

		if (!email || !password || !repeatPassword) {
			setErrorSubmit('Не все поля ввода заполнены');
		} else {
			setErrorSubmit('');
			console.log(getState());
		}
	};

	const onChange = ({ target }) => {
		updateState(target.name, target.value);

		if (password.length > 8) {
			setErrorPassword(null);
		}

		if (target.name === "repeatPassword" && !errorEmail && !errorPassword && target.value === password) {
			submitFormRef.current.focus()
		}
	};

	const onEmailBlur = ({ target }) => {
		let newError = null;

		const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

		if (!emailRegExp.test(target.value)) {
			newError =
				'Некорректно введена почта. При вводе почты должны быть символы "@" и "."';
		}

		setErrorEmail(newError);
	};

	const onPasswordBlur = () => {
		let newError = null;

		if (password.length <= 8) {
			newError = 'Пароль должен быть больше 8 символов';
		}

		setErrorPassword(newError);
	};

	const onRepeatPasswordBlur = ({ target }) => {
		let newError = null;

		if (target.value !== password) {
			newError = 'Пароли не совпадают';
		}

		setErrorRepeatPassword(newError);
	};

	return (
		<div className={Styles.rectangle}>
			<p className={Styles.register}>Регистрация</p>
			<form className={Styles['reg-form']} onSubmit={onSubmit}>
				<label className={Styles['reg-form__label']}>
					<p className={Styles['reg-form__text']}>Почта</p>
					<input
						className={Styles['reg-form__email']}
						name="email"
						value={email}
						type="email"
						placeholder="Почта"
						onChange={onChange}
						onBlur={onEmailBlur}
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
							value={password}
							type={typeInputPass}
							placeholder="Пароль"
							onChange={onChange}
							onBlur={onPasswordBlur}
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
							value={repeatPassword}
							type={typeInputRepPass}
							placeholder="Повторите пароль"
							onChange={onChange}
							onBlur={onRepeatPasswordBlur}
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
				{errorSubmit && (
					<p className={Styles['reg-form__error-submit']}>{errorSubmit}</p>
				)}
			</form>
		</div>
	);
};
