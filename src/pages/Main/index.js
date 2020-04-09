import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import Input from '../../components/input';
import CurrencyInput from 'react-currency-input';
import './styles.css';

function Main () {
	const [ todayExchangeRate, setTodayExchangeRate ] = useState('')

	useEffect(() => {
		loadTodayExchangeRate()
	})

	const loadTodayExchangeRate = async () => {
		const response = await api.get('/all/USD-BRL');
		const todayValue = Number(response.data.USD.bid).toFixed(2)
		setTodayExchangeRate(todayValue)
	}

	const [ dollar, setDollar ] = useState(0);
	const [ stateTax, setStateTax ]  = useState(0);

	const getDollar = (event, maskedvalue, floatvalue) => {
		setDollar(Number(maskedvalue.slice(1)).toFixed(2))
	}

	const getStateTax = (event, maskedvalue, floatvalue) => {
		setStateTax(Number(maskedvalue.slice(0, maskedvalue.length - 1)).toFixed(2))
	}

	const [ paymentMethod, setPaymentMethod ] = useState('')

	const iof = {
		cash: 0.011,
		creditCard: 0.064
	}
	
	const dollarWithTax = (Number(dollar) + ((Number(stateTax)/100) * Number(dollar))).toFixed(2)

	const dollarToReal = (dollarWithTax * todayExchangeRate).toFixed(2)

	const realWithTax = 
		paymentMethod ?
			(paymentMethod === 'cash' ? 
			(Number(dollarWithTax) * (Number(todayExchangeRate) + Number(todayExchangeRate * iof[paymentMethod]))).toFixed(2) : 
			((Number(dollarWithTax) + Number(dollarWithTax * iof[paymentMethod])) * (Number(todayExchangeRate))).toFixed(2)
			) : '0.00'

	return (
		<div>
			<header className='header flex-collumn-center'>
				<p className='title'>DÓLAR REAL</p>
				<div className='currency-exchange-rate flex-collumn-center'>
					<p className='label-value'>Cotação do dólar:</p>
					<p className='current-value'>R${todayExchangeRate}</p>
				</div>
			</header>
			<main className='main'>
				<form className='form flex-collumn-center'>
					<div>
						<label className='input-label'>DIGITE O VALOR EM DÓLARES: </label>
						<CurrencyInput className='input-currency' value={dollar} onChangeEvent={getDollar} prefix='$' thousandSeparator='' />
					</div>
					<div>
						<label className='input-label'>DIGITE A TAXA DE ESTADO: </label>
						<CurrencyInput className='input-currency' value={stateTax} onChangeEvent={getStateTax} suffix='%' thousandSeparator='' />
					</div>
					<div className='input-radio'>
					<Input label={'DINHEIRO'} type={'radio'} name={'payment'} value={'cash'} 
						onChange={(e) => setPaymentMethod(e.currentTarget.value)} />

					<Input label={'CARTÃO'} type={'radio'} name={'payment'} value={'creditCard'} 
						onChange={(e) => setPaymentMethod(e.currentTarget.value)} />
					</div>
				</form>
				<ul className='resume-info'>
					<li className='resume-item'>IOF: <span>{paymentMethod ? (iof[paymentMethod]*100).toFixed(1) + '%' : 'Selecione o método de pagamento'}</span></li>
					<li className='resume-item'>Total em dólar sem imposto: <span>${Number(dollar).toFixed(2)}</span></li>
					<li className='resume-item'>Total em dólar com imposto: <span>${dollarWithTax}</span></li>
					<li className='resume-item'>Total em reais sem imposto: <span>R${dollarToReal}</span></li>
					<li className='resume-item'>Total em reais com imposto: <span>R${realWithTax}</span></li>
				</ul>
			</main>
		</div>
	)
}

export default Main