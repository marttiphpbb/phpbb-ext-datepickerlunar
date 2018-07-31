/**
* Translated to Javascript from:
* Calculations of moon's phase and distance are based on the
* CPAN Astro::MoonPhase module 0.60 which refers to the algorithms
* found in Practical Astronomy With Your Calculator by Peter Duffett-Smith,
* Second Edition, Cambridge University Press, 1981
* Translated to PHP by Stephen A. Zarkos, 2007
* Calculate Moon Phase Data with PHP
* http://www.obsid.org/2008/05/calculate-moon-phase-data-with-php.html
*/

function findPhases(unixStart, unixEnd){
		var phases = [];

		// Convert to Julian time
		var startJd = (unixStart / 86400) + 2440587.5;
		var endJd = (unixEnd / 86400) + 2440587.5;

		var synodicMonthLength = 29.53058868;
		var deg = Math.PI / 180;
		var maxMoonCycles = 100;

		var dayFloor = startJd;

		if (dayFloor >= 2299161){
			var alpha = Math.floor((dayFloor - 1867216.25) / 36524.25);
			dayFloor = dayFloor + 1 + alpha - Math.floor(alpha / 4);
		}

		dayFloor += 1524;

		var year = Math.floor((dayFloor - 122.1) / 365.25);
		var month = Math.floor((dayFloor - Math.floor(365.25 * year)) / 30.6001);

		month = (month < 14) ? month - 1 : month - 13;
		year = (month > 2) ? year - 4716 : year - 4715;

		var synMonth = Math.floor((year + ((month - 1) * (1 / 12)) - 1900) * 12.3685) - 2;  // before :: -2

		for (var maxLoop = synMonth + maxMoonCycles; synMonth < maxLoop; synMonth += 0.25){
			var phase = synMonth - Math.floor(synMonth);

			jcTime = synMonth / 1236.85;	// time in Julian centuries from 1900 January 0.5
			jcTime2 = jcTime * jcTime;		// square for frequent use
			jcTime3 = jcTime2 * jcTime;		// cube for frequent use

			// mean time of phase
			phaseTime = 2415020.75933
				+ synodicMonthLength * synMonth
				+ 0.0001178 * jcTime2
				- 0.000000155 * jcTime3
				+ 0.00033 * Math.sin((166.56 + 132.87 * jcTime - 0.009173 * jcTime2) * deg);

			// Sun's mean anomaly
			sunAnom = 359.2242
				+ 29.10535608 * synMonth
				- 0.0000333 * jcTime2
				- 0.00000347 * jcTime3;

			// Moon's mean anomaly
			moonAnom = 306.0253
				+ 385.81691806 * synMonth
				+ 0.0107306 * jcTime2
				+ 0.00001236 * jcTime3;

			// Moon's argument of latitude
			moonLat = 21.2964
				+ 390.67050646 * synMonth
				- 0.0016528 * jcTime2
				- 0.00000239 * jcTime3;

			if ((phase < 0.01) || (Math.abs(phase - 0.5) < 0.01)){
				// Corrections for New and Full Moon.
				phaseTime += (0.1734 - 0.000393 * jcTime) * Math.sin(sunAnom * deg)
					+ 0.0021 * Math.sin(2 * sunAnom * deg)
					- 0.4068 * Math.sin(moonAnom * deg)
					+ 0.0161 * Math.sin(2 * moonAnom * deg)
					- 0.0004 * Math.sin(3 * moonAnom * deg)
					+ 0.0104 * Math.sin(2 * moonLat * deg)
					- 0.0051 * Math.sin((sunAnom + moonAnom) * deg)
					- 0.0074 * Math.sin((sunAnom - moonAnom) * deg)
					+ 0.0004 * Math.sin((2 * moonLat + sunAnom) * deg)
					- 0.0004 * Math.sin((2 * moonLat - sunAnom) * deg)
					- 0.0006 * Math.sin((2 * moonLat + moonAnom) * deg)
					+ 0.0010 * Math.sin((2 * moonLat - moonAnom) * deg)
					+ 0.0005 * Math.sin((sunAnom + 2 * moonAnom) * deg);
			} else if ((Math.abs(phase - 0.25) < 0.01 || (Math.abs(phase - 0.75) < 0.01))) {
				phaseTime += (0.1721 - 0.0004 * jcTime) * Math.sin(sunAnom * deg)
					+ 0.0021 * Math.sin(2 * sunAnom * deg)
					- 0.6280 * Math.sin(moonAnom * deg)
					+ 0.0089 * Math.sin(2 * moonAnom * deg)
					- 0.0004 * Math.sin(3 * moonAnom * deg)
					+ 0.0079 * Math.sin(2 * moonLat * deg)
					- 0.0119 * Math.sin((sunAnom + moonAnom) * deg)
					- 0.0047 * Math.sin((sunAnom - moonAnom) * deg)
					+ 0.0003 * Math.sin((2 * moonLat + sunAnom) * deg)
					- 0.0004 * Math.sin((2 * moonLat - sunAnom) * deg)
					- 0.0006 * Math.sin((2 * moonLat + moonAnom) * deg)
					+ 0.0021 * Math.sin((2 * moonLat - moonAnom) * deg)
					+ 0.0003 * Math.sin((sunAnom + 2 * moonAnom) * deg)
					+ 0.0004 * Math.sin((sunAnom - 2 * moonAnom) * deg)
					- 0.0003 * Math.sin((2 * sunAnom + moonAnom) * deg);

				if (phase < 0.5){
					// First quarter correction.
					phaseTime += 0.0028 - (0.0004 * Math.cos(sunAnom * deg)) + (0.0003 * Math.cos(moonAnom * deg));
				} else {
					// Last quarter correction.
					phaseTime += -0.0028 + (0.0004 * Math.cos(sunAnom * deg)) - (0.0003 * Math.cos(moonAnom * deg));
				}
			}

			if (phaseTime >= endJd){
				return phases;
			}

			if (phaseTime >= startJd){
				phase = Math.floor(4 * phase);

				phases.push({
					"phase": phase,
					"unix": Math.round((phaseTime - 2440587.5) * 86400),
					"jd": Math.round(phaseTime + .5)
                });
			}
		}
	}