<template>
    <div id="openeditModal" class="modal fade" tabIndex="-1" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="openeditModalLable">{{ modalTitle }}</h5>
                    <button tyğe="button" class="btn-close" aria-label="Close" @click="modal.hide()"></button>
                </div>
                <div class="modal-body mx-5">
                    <div class="col mb-3">
                        <label for="comment" class="form-label">Comment
                            <span class="text-danger">*</span>
                        </label>
                        <input  type="text" class="form-control" id="comment" name="comment" required>
                    </div>
                    <div class="text-end mb-4 d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-secondary" @click="modal.hide()">Close</button>
                        <button type="button" class="btn btn-primary" @click="editComment()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DashboardEditComment',
        props : {
            visible : {
                type : Boolean,
                required : true
            },
            modalTitle : {
                type : String,
                required : true
            }
            
        },
        
        data() {
            return {
                open : this.visible
            }
        },
       
        methods : {
            // openEditModal(comment) {
            //     this.$emit('openEditModal', comment);
            // }
        },
        watch : {
            visible(newVal) {
                this.open = newVal;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>