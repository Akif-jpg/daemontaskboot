package api

type Route interface {
	GetName() string
	SetName(name string)
	RegisterRoutes(api *API)
	Start() error
}
