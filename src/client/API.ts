class API
{
	public static fetch( api: string ): Promise<Object>
	{
		return fetch( '/api/' + api, { method:'POST', credentials: 'include'} ).then( ( result ) =>
		{
			if( !result.ok ) { throw false; }
			return result.json();
		} );
	}

	/*Sample
	public static version(): Promise<AppVersionInfo>
	{
		return API.fetch( '' );
	}*/
}