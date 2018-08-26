let Util = {};

Util.ms2str = function(time)
{
	const m = Math.floor(time / (1000*60));
	time -= m*(1000*60);

	const s = Math.floor(time / 1000);
	time -= s*1000;

	const ms = Math.floor(time / 10);
	return Util.fill0(m)+":"+Util.fill0(s)+"."+Util.fill0(ms);
}

Util.fill0 = function(n)
{
	if(n<10)
		return "0"+n;
	else
		return ""+n;
}
