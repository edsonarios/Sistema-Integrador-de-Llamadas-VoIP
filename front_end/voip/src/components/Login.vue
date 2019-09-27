<template>
    <div class="container">
        <div>
        <h1>Sistema de Telefonia VoIP</h1>
        </div>
       <section class="login-block">
                <div class="container">
                    <div class="row">
                    <div class="col login-sec">
                        <h2 class="text-center">Iniciar sesión</h2>
                        <form class="login-form">
            <div class="form-group">
                <label for="exampleInputEmail1" class="text-uppercase">Usuario</label>
                <input type="text" class="form-control" placeholder="">
                
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">contraseña</label>
                <input type="password" class="form-control" placeholder="">
            </div>
                <div class="form-check">
                <label class="form-check-label">
                <input type="checkbox" class="form-check-input">
                <small>Recordar contraseña</small>
                </label>
                <button type="submit" class="btn btn-login float-right">Entrar</button>
            </div>
            
            </form>
            </div>
                </div>
                </div>
</section>
    </div>
    
</template>


<script>    
export default {
    name: 'Login'
}
</script>