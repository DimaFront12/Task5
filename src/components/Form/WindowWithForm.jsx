import Styles from './WindowWithForm.module.css';
import { useRef, useState } from 'react';
import { useStore } from '../../store/useStore';

export const WindowWithForm = () => {
	const { getState, updateState } = useStore();
	const { email, password, repeatPassword } = getState();
	const [typeInputPass, setTypeInputPass] = useState('password');
	const [typeInputRepPass, setTypeInputRepPass] = useState('password');
	const [errorsObj, setErrorsObj] = useState({
		email: null,
		password: null,
		repeatPassword: null,
		submit: null,
	})

	const submitFormRef = useRef(null);

	const changeTypeInputPass = (evt) => {
		evt.preventDefault();
		setTypeInputPass(typeInputPass === 'password' ? 'text' : 'password');
	};

	const changeTypeInputRepPass = (evt) => {
		evt.preventDefault();
		setTypeInputRepPass(typeInputRepPass === 'password' ? 'text' : 'password');
	};

	const onSubmitForm = (evt) => {
		evt.preventDefault();
	};

	const onClickButton = ({ target }) => {
		if (!email || !password || !repeatPassword) {
			setErrorsObj({...errorsObj, [target.name]: "Не все поля заполнены"})
		} else {
			setErrorsObj({...errorsObj, [target.name]: null});
			console.log(getState())
		}
	}

	const onChange = ({ target }) => {
		updateState(target.name, target.value);

		if (target.name === "repeatPassword" && !errorsObj.email && !errorsObj.password && target.value === password) {
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

		setErrorsObj({...errorsObj, [target.name]: newError})
	};

	const onPasswordBlur = ({ target }) => {
		let newError = null;

		if (password.length <= 8) {
			newError = 'Пароль должен быть больше 8 символов';
		}

		setErrorsObj({...errorsObj, [target.name]: newError})
	};

	const onRepeatPasswordBlur = ({ target }) => {
		let newError = null;

		if (target.value !== password) {
			newError = 'Пароли не совпадают';
		}

		setErrorsObj({...errorsObj, [target.name]: newError})
	};

	return (
		<div className={Styles.rectangle}>
			<p className={Styles.register}>Регистрация</p>
			<form className={Styles['reg-form']} onSubmit={onSubmitForm}>
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
					{errorsObj.email && (
						<p className={Styles['reg-form__error']}>{errorsObj.email}</p>
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
						<i
							className={Styles['reg-form__show']}
							onClick={changeTypeInputPass}
						></i>
					</div>
					{errorsObj.password && (
						<p className={Styles['reg-form__error']}>{errorsObj.password}</p>
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
						<i
							className={Styles['reg-form__show']}
							onClick={changeTypeInputRepPass}
						></i>
					</div>
					{errorsObj.repeatPassword && (
						<p className={Styles['reg-form__error']}>{errorsObj.repeatPassword}</p>
					)}
				</label>

				<button
					ref={submitFormRef}
					type="submit"
					name="submit"
					className={Styles['reg-form__button']}
					disabled={errorsObj.email || errorsObj.password || errorsObj.repeatPassword}
					onClick={onClickButton}
				>
					Зарегистрироваться
				</button>
				{errorsObj.submit && (
					<p className={Styles['reg-form__error-submit']}>{errorsObj.submit}</p>
				)}
			</form>
		</div>
	);
};
