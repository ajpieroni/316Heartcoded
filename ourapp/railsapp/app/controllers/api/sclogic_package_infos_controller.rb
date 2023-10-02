class Api::SclogicPackageInfosController < ApplicationController
    protect_from_forgery with: :null_session
    def fetch_asset_ids
        unique_id = params[:unique_id]
        box_number = params[:box_number]

        asset_ids = SclogicPackageInfo.fetch_asset_ids(unique_id, box_number)

        render json: asset_ids
    end
end
