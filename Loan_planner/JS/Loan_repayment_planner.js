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
	var deductionAmount = document.getElementById('deduction').value
	var timeOfDeduction = document.getElementById('time').value
	console.log(loanTaken.length)

	if(loanTaken.length >0 && rateOfIntrest.length > 0 && deductionAmount.length > 0 && timeOfDeduction.length > 0){
		loanTaken = parseFloat(loanTaken)
		rateOfIntrest = parseFloat(rateOfIntrest)
		deductionAmount = parseFloat(deductionAmount)
		timeOfDeduction = parseInt(timeOfDeduction)
		
		calculateSummary(loanTaken, rateOfIntrest, deductionAmount, timeOfDeduction);
		document.getElementById('short-summary').classList.add('short-summary-animation')
	}
	else{
		document.getElementById('err').classList.add('err-show')
		setTimeout(()=>{
			console.log("hello")
			document.getElementById('err').classList.remove('err-show')
		},2000)
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
		p_amount = `Principal amount: ${p}`
		power = Math.pow((1 + r / 100), (dT/12.00));
        ci = (p*power) - p;
        interest = `Intrest of this month: ${ci}`
        p = p+ci-dA;
        p_after_deduction = `Principal amount after deduction of ${dA} amount : ${p}`
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
        total_time = `Total time taken to pay the Loan: ${years} years and ${months} month(s)`
    }
    else{
    	total_time = `Total time taken to pay the Loan: ${loanPayOffTime} months`
    }
    total_interest = `Total intrest Paid in the process: ${totalIntrest}`
    rem_amt = `Amount to be paid in the ${loanPayOffTime} th month is: ${final_amt}`

    short_container.innerHTML = `
    	<ul class = "summary-contents">
    		<p>${total_time}</p>
    		<p>${total_interest}</p>
    		<p>${rem_amt}</p>
    	</ul>
    ` 
    // document.write(rem_amt)
    // document.write(loanPayOffTime)
}

const onlyNumberKey = (e) =>{
	if(e.keyCode >=48 && e.keyCode <=57)
		return true
	return false
}