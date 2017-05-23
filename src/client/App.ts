declare const Version: AppVersionInfo;
declare function Goodbye(): void;
declare function VersionCheck(): Promise<{}>;

class App
{
	public goodbye() { Goodbye(); }
	public checkVersion(){ return VersionCheck(); }

	constructor(){}

	public init()
	{
		if ( Version.vcode < 0 )
		{
			this.checkVersion().then( () => { this.initPage(); } );
		} else
		{
			this.initPage();
		}
	}

	private initPage(){}
}
