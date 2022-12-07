const modalinstruccion = document.getElementById("modalinstruccion")
const modalcarrito = document.getElementById("modalcarrito")

modalinstruccion.innerHTML = 
                `<div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Instrucciones</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="pasos">
                                <h3>Seleccione los materiales destinados para la creación de su varita:</h3>
                                <p>Una <span class="resalt">VARITA</span> es un objeto utilizado por un mago o una bruja que permite canalizar su magia. Está hecha de madera y contiene una sustancia mágica en su núcleo.</p>
                                <ol>
                                    <li>Seleccione un tipo de <span class="resalt">madera</span>.</li>
                                    <li>Seleccione un tipo de <span class="resalt">núcleo</span>.</li>
                                    <li>Haga click en el <span class="resalt">Botón Varita</span> para diseñar su varita y conocer el costo.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>`

modalcarrito.innerHTML =
                `<div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Canasta Diagon</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="carritos">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Importe</th>
                                            <th>Quitar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>No hay productos en su Canasta</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="totalCanasta">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
