import streamlit as st
import streamlit_authenticator as stauth
import yaml
from streamlit.components.v1 import html
from yaml.loader import SafeLoader

"""
Meme page - Taquilla Gratis
Esto es una página de prueba para ver si funciona el sistema de autenticación, así como la redirección a una página externa.
En este caso, es la creación de una taquilla gratis.
"""

config_path = "authentication/config.yaml"
with open(config_path) as file:
    config = yaml.load(file, Loader=SafeLoader)
authenticator = stauth.Authenticate(
    config['credentials'],
    config['cookie']['name'],
    config['cookie']['key'],
    config['cookie']['expiry_days'],
    config['preauthorized']
)
me, authentication_status, username = authenticator.login('Login', 'main')

def open_page(url):
    open_script= """
        <script type="text/javascript">
            window.open('%s', '_blank').focus();
        </script>
    """ % (url)
    html(open_script)


if not st.session_state["authentication_status"]:
    st.error('Username/password is incorrect')
elif st.session_state["authentication_status"] is None:
    st.warning('Please enter your username and password')
elif st.session_state["authentication_status"]:
    authenticator.logout('Logout', 'main')

    st.title("Obten una taquilla gratuita")
    st.write("¡Enhorabuena! Has encontrado una taquilla gratuita. Para obtenerla, haz click en el botón de abajo.")
    if st.button("Genera taquilla gratuita"):
        open_page("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
