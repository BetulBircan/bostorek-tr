<template>
     <!-- Button -->
    <div class="row-mb-3">
       <div class="col text-end">
        <!--modal.show() modalı gösterir butonu tıklayınca modal açılır  -->
        <button type="button" class="btn btn-primary" @click="modal.show()">
            Add Book
        </button>
       </div>
    </div>

    <!-- Table -->
     <div class="row">
        <div class="col">
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Page</th>
                        <th class="text-center">Edit</th>
                        <th class="text-center">Delete</th>
                    </tr>
                </thead>
                
                    <TransitionGroup name="list" tag="tbody">
                    <tr v-for="book in userBooks" :key="book._id">
                        <td>{{ book.title }}</td>
                        <td>{{ book.author }}</td>
                        <td style="max-width:250px">
                            {{ book.description }}
                        </td>
                        <td>
                           {{ book.pageNumber }}
                        </td>
                        <td class="text-center">
                            <font-awesome-icon :icon="['far','pen-to-square']" class="text-warning" style="cursor:pointer" />
                        </td>
                        <td class="text-center">
                            <font-awesome-icon :icon="['fas', 'trash']" class="text-danger" style="cursor:pointer" @click="openDeleteModal(book._id, book.title)"/>
                            <!-- <font-awesome-icon :icon="['fas', 'trash']" class="text-danger" style="cursor:pointer" @click="deleteBook(book._id, book.title)"/> -->
                        </td>
                    </tr>
                </TransitionGroup>
                
            </table>
        </div>
     </div>

     <!-- Modal -->
      <!-- ref="component ile dom elementi arasındaki bağlantıyı kurmamızı sağlayan vue ya ait spesifik attribute" -->
      <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">Add Book</h5>
                    <!-- modal.hide() modal gizlenir yani butona basınca kapatılır-->
                    <button type="button" class="btn-close" aria-label="Close" @click="modal.hide()"></button>
                </div>
                <div class="modal-body mx-5">
                    <div class="col mb-3">
                        <label for="title" class="form-label">Title
                        <span class="text-danger">*</span>
                        </label>
                        <input v-model="newBook.title" type="text" class="form-control" id="title" name="title" required />
                    </div>
                    <div class="col mb-3">
                        <label for="author" class="form-label">Author
                            <span class="text-danger">*</span>
                        </label>
                        <input v-model="newBook.author" type="text" class="form-control" id="author" name="author" required>
                    </div>
                    <div class="col mb-3">
                        <label for="description" class="form-label">Description
                            <span class="text-danger">*</span>
                        </label>
                        <textarea v-model="newBook.description" name="description" id="description" class="form-control" cols="30" rows="10"></textarea>
                    </div>
                    <div class="col mb-3">
                        <label for="author" class="form-label">Number Of Pages
                            <span class="text-danger">*</span>
                        </label>
                        <input v-model="newBook.pageNumber" type="number" class="form-control" id="numOfPages" name="numOfPages" required>
                    </div>
                    <div class="text-end mb-4 d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-secondary" @click="modal.hide()">Close</button>
                        <button type="button" class="btn btn-primary" @click="addBook">Save</button>
                    </div>
                </div>
            </div>
        </div>
      </div>

        <!-- Delete Modal -->
        <div class="modal fade" ref="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">Delete Book</h5>
                    <!-- modal.hide() modal gizlenir yani butona basınca kapatılır-->
                    <button type="button" class="btn-close" aria-label="Close" @click="deleteModal.hide()"></button>
                </div>
                <div class="modal-body mx-5">
                    <div class="col mb-3">
                        <p>Are you sure you want to delete <strong>{{ denemeBook.title }}</strong> book?</p>
                    </div>
                  
                    <div class="text-end mb-4 d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-secondary" @click="deleteModal.hide()">Close</button>
                        <button type="button" class="btn btn-primary" @click="deleteBook(denemeBook.id, denemeBook.title)">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
      </div>

</template>

<script>
import { Modal } from 'bootstrap';
import { useBookStore } from '@/stores/bookStore';
import { mapActions, mapState } from 'pinia';
import { useToast } from 'vue-toastification';
    export default {
        name : 'DashboardBooks',
        data() {
            return {
               modal : null,
            //    deleteModal : null,
               newBook : {
                   title : '',
                   author : '',
                   description : '',
                   pageNumber : null
               },
               denemeBook : {
                id : '',
                   title : '',
                   
               },
            }
        },
        /*
        * Vue.js lifecycle hook
        - Vue.js componentlerinin yaşam döngüsü içerisinde yer alan bir hook
        - Vue.js componentlerinin oluşturulması, güncellenmesi ve yok edilmesi gibi durumlarla ilgili işlemleri yapmamızı sağlar
        - Mounted hook'u, componentin DOM'a yerleştirildiği anda tetiklenir
        - Bu hook içerisinde, componentin DOM'a yerleştirilmesi sonrasında yapılması gereken işlemleri gerçekleştirebiliriz.
        - Örneğin; componentin içerisinde yer alan bir elemente erişmek istediğimizde, bu elementin DOM'a yerleştirilmesi sonrasında bu işlemi gerçekleştirebiliriz
        -Created hook'u ile benzerdir, fakat Created hook'u, componentin data ve methodlarının oluşturulduğu anda tetiklenirken, Mounted hook'u, componentin DOM'a yerleştirildiği anda tetiklenir
        - Bu hook içerisinde, componentin data ve methodlarına erişebiliriz
        - Created ve mounted hook ları arasındaki en önemli fark created sayfa olultuğu anda, mounted ise dom a yerleştirildiği anda çalışır
         */
        mounted() {
            //modal nesnesi oluşturulur addEditModal modalı ile bağlantı kurulur onu referans alır.
            this.modal = new Modal(this.$refs.addEditModal);
            this.deleteModal = new Modal(this.$refs.deleteModal);
        },

        created() {
            this.fetchBooksByUploader();
        },

        computed : {
            ...mapState(useBookStore, ['userUploadedBooks']),
            userBooks() {
                return this.userUploadedBooks.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        },

        methods : {
            ...mapActions(useBookStore, ['addNewBook','fetchBooksByUploader','deleteTheBook']),	

            showToast(message, options) {
                const toast = useToast();

                toast(message, {
                    position : 'top-right',
                    closeButton : 'button',
                    icon : true,
                    rtl : false,
                    ...options
                });
            },

            openDeleteModal(bookId, bookTitle) {
                this.deleteModal.show();
                this.denemeBook.id = bookId;
                this.denemeBook.title = bookTitle;
            },

            async deleteBook(bookId, bookTitle) {
                try {
                    
                    await this.deleteTheBook(bookId);
                    this.deleteModal.hide();
                    
                    await this.fetchBooksByUploader();

                    this.showToast(`${bookTitle} deleted successfully`, {
                        type : 'warning',
                        timeout : 3000
                    });

                    // const toast = useToast();

                    // toast.warning(`${bookTitle} deleted successfully`, {
                    //     position : 'top-right',
                    //     timeout : 3000,
                    //     closeButton : 'button',
                    //     icon : true,
                    //     rtl : false
                    // })
                } catch (error) {
                    console.log(error);
                    
                }
            },
            async addBook() {
               try {
                await this.addNewBook(this.newBook);
                this.modal.hide();

                this.newBook = {
                   title : '',
                   author : '',
                   description : '',
                   pageNumber : null
               }

               this.fetchBooksByUploader();

               this.showToast('New book added successfully', {
                   type : 'success',
                   timeout : 1000
               });

            //    const toast = useToast();

            //    toast.success('New book added successfully', {
            //     position : 'top-right',
            //     timeout : 1000,
            //     closeButton : 'button',
            //     icon : true,
            //     rtl : false

            //    })

               } catch (error) {
                 
                console.log(error);
                
               }
            }
        }

    }
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>