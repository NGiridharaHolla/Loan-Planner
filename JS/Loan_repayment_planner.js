const display_details = () => {
	document.getElementById('more-details-section').classList.add('more-details-section-animation');
	document.getElementById('main').style.opacity = '0.2';
	document.getElementById('short-summary').style.opacity = '0.2';
	document.getElementById('body').style.overflow = 'hidden';
}

const close_dialog = () =>{
	document.getElementById('more-details-section').classList.remove('more-details-section-animation');
	document.getElementById('main').style.opacity = '1.0';
	document.getElementById('short-summary').style.opacity = '1.0';
	document.getElementById('body').style.overflow = 'auto';
}

const calculate = (event) =>{
	event.preventDefault();
	var loanTaken = document.getElementById('priniciple').value
	var rateOfIntrest = document.getElementById('interest').value
	var rateOfIntrest_m = document.getElementById('interest-mobile').value
	var deductionAmount = document.getElementById('deduction').value
	var deductionAmount_m = document.getElementById('deduction-mobile').value
	var timeOfDeduction = document.getElementById('time').value

	if(loanTaken.length>0 && (rateOfIntrest.length>0 || rateOfIntrest_m > 0) && (deductionAmount.length>0 || deductionAmount_m>0) && timeOfDeduction.length>0){
		if(rateOfIntrest_m != '')
			rateOfIntrest = rateOfIntrest_m
		if(deductionAmount_m != '')
			deductionAmount = deductionAmount_m
		loanTaken = parseFloat(loanTaken)
		rateOfIntrest = parseFloat(rateOfIntrest)
		deductionAmount = parseFloat(deductionAmount)
		timeOfDeduction = parseInt(timeOfDeduction)

		calculateSummary(loanTaken, rateOfIntrest, deductionAmount, timeOfDeduction);
		document.getElementById('short-summary').classList.add('short-summary-animation')
	} else{
		document.getElementById('err-container').classList.add('err-animation')
		setTimeout(()=>{
			document.getElementById('err-container').classList.remove('err-animation')
		},3000)
	}
}

const calculateSummary = (p, r, dA, dT) =>{
	var cnt = 0;
	var ci, power, totalIntrest = 0, iterations = 0, loanPayOffTime = 1, years = 0, months = 0;
	var line_break, time_period, p_amount, interest, p_after_deduction, total_time, total_interest, rem_amt, final_amt;
	if(cnt > 0){
		line_break = "------------------------------------------------------------"
	}
	var container = document.getElementById('more-details')
	var short_container = document.getElementById('short-summary-container')

	while(p>0){
		time_period = `${loanPayOffTime} th month:`
		p_amount = `Principal amount: <strong>${p.toFixed(2)}</strong>`
		power = Math.pow((1 + r / 100), (dT/12.00));
        ci = (p*power) - p;
        interest = `Intrest of this month: <strong>${ci.toFixed(2)}</strong>`
        p = p+ci-dA;
        p_after_deduction = `Principal amount after deduction of ${dA} amount : <strong>${p.toFixed(2)}</strong>`
        totalIntrest += ci;
        loanPayOffTime += dT;
        iterations++;

        container.innerHTML += `
        <div class="summary-contents-container" id="summary-contents-container">
        	<ul class = "summary-contents" id="summary-contents">
	        	<p>${time_period}</p>
	        	<p>${p_amount}</p>
	        	<p>${interest}</p>
	        	<p>${p_after_deduction}</p>
        	</ul>
        </div>
        `
	}
	totalIntrest = totalIntrest.toFixed(2)
	final_amt = (p+dA).toFixed(2)
	// document.write(container.innerHTML)
	if(loanPayOffTime>=12){
        years = parseInt(loanPayOffTime/12);
        months = loanPayOffTime - (years*12);
        total_time = `${years} years and ${months} month(s)`
    }
    else{
    	total_time = `${loanPayOffTime} months`
    }
    total_interest = `${totalIntrest}`
    rem_amt = `${final_amt}`

    short_container.innerHTML = `
    	<div class="short-summary-first-half">
			<div class="short-summary-content">
				<p class="content-heading">Total Time Required</p>
				<p><strong>${total_time}</strong></p>
			</div>

			<div class="short-summary-content">
				<p class="content-heading">Total Interest</p>
				<p><strong>${total_interest}</strong></p>
			</div>
		</div>
		<div class="short-summary-second-half">
			<div class="short-summary-content">
				<p class="content-heading">Amount to be paid in the ${loanPayOffTime}th month</p>
				<p><strong>${rem_amt}</strong></p>
			</div>
		</div>
    ` 
}

const check_input = (e) =>{
	if(e.keyCode >=48 && e.keyCode < 58)
		return true
	return false
}