asm numeroAlto

import ./StandardLibrary
import ./CTLlibrary

signature:
	// DOMAINS
	domain Values subsetof Integer
	domain BalanceDomain subsetof Integer
	abstract domain Player
	enum domain WinnerDomain = {USER|COMPUTER|TIE}
	// FUNCTIONS
	static user: Player
	static pc: Player
	monitored userChoice: Values //value chosen by the user
	controlled balance: Player -> BalanceDomain
	derived endOfGame: Boolean
	derived finalWinner: WinnerDomain
	derived roundWinner: Prod(Values,Values) -> WinnerDomain
	derived totalCoin: BalanceDomain
	out winner: WinnerDomain

definitions:
	// DOMAIN DEFINITIONS
	domain Values = {1 : 5}
	domain BalanceDomain = {0:10}
	// FUNCTION DEFINITIONS
	function finalWinner = 
		if balance(user) = 0 then
			if balance(pc) = 0 then
				TIE
			else
				COMPUTER
			endif
		else
			if balance(pc) = 0 then
				/* */
				USER
			endif
		endif
		
	function roundWinner($uc in Values, $pcc in Values) =
		if $uc = $pcc then // TIE
			TIE
		else 
			if $uc > $pcc then //PLAYER WIN
				USER
			else // PC WIN
				COMPUTER
			endif
		endif
	
	function endOfGame = (exist $p in Player with (balance($p) = 0))
	
	function totalCoin = balance(user) + balance(pc)
	// RULE DEFINITIONS
		
	macro rule r_Play =
		let ($uc = userChoice) in
			choose $pcc in Values with true do
				switch roundWinner($uc,$pcc)
				case TIE:
					skip
				case USER:
					par
						balance(user) := balance(user)+1
						balance(pc) := balance(pc)-1
					endpar
				case COMPUTER:
					par
						balance(user) := balance(user)-1
						balance(pc) := balance(pc)+1
					endpar
				endswitch
		endlet
	
	// INVARIANTS
	invariant inv_total_colin over balance:  (balance(pc) + balance(user) = 10)
		
	CTLSPEC ag(totalCoin = 10)		//ci sono sempre 10 coin nel sistema
	CTLSPEC ef(ag(balance(pc) > 1)) //esiste un cammino per cui il saldo del pc è sempre maggiore di 1
	
	// MAIN RULE
	main rule r_Main =
		if not(endOfGame) then
			r_Play[]
		else
			winner := finalWinner
		endif

// INITIAL STATE
default init s0:
	function balance($p in Player) = 5
